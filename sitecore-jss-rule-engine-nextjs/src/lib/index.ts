import { GetItemByIdQuery } from '../queries/getItemById'
import { constants, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import { JssRuleEngine } from 'sitecore-jss-rule-engine'

export class PersonalizationHelper {

    endpointUrl:string;
    sitecoreApiKey: string;

    constructor(graphQlEndpoint:string, sitecoreApiKey:string){
        this.endpointUrl = graphQlEndpoint;
        this.sitecoreApiKey = sitecoreApiKey;
    }

    guid() {
        var w = () => { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
        return `${w()}${w()}-${w()}-${w()}-${w()}-${w()}${w()}${w()}`;
    }

    async getItemById(itemId: String) {
        if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
            return null;
        }

        const graphQLClient = new GraphQLRequestClient(this.endpointUrl, {
            apiKey: this.sitecoreApiKey,
          });

        var graphQlResponse = await graphQLClient.request(GetItemByIdQuery, {
            "id": itemId
        });
        return graphQlResponse;
    }

    async populateFields(rendering: any) {

        if (!rendering?.dataSource?.length) {
            return;
        }

        var itemResult:any = await this.getItemById(rendering?.dataSource);

        if (!itemResult) {
            return;
        }

        itemResult.item.fields.forEach(async (fieldObj: any) => {
            if (rendering.fields[fieldObj.name]?.value) {
                rendering.fields[fieldObj.name].value = fieldObj.value;
            } else {
                rendering.fields[fieldObj.name] = {
                    value: fieldObj.value
                };
            }
        });
        return rendering;
    }

    async doPersonalizePlaceholder(placeholderPersonalization: any, elementPlaceholderRenderings: any) {
        if (placeholderPersonalization && placeholderPersonalization.renderings) {

            for (let y = 0; y < elementPlaceholderRenderings.length; y++) {

                let renderingToUpdate = elementPlaceholderRenderings[y];

                var renderingPersonalization = placeholderPersonalization.renderings
                    .find((i: any) => i.name == renderingToUpdate.componentName);

                if (!renderingPersonalization) {
                    continue;
                }

                if (renderingPersonalization.hide) {
                    if (!renderingToUpdate) {
                        console.log('Layout is missing rendering named ', renderingPersonalization.name);
                        continue;
                    }

                    elementPlaceholderRenderings = elementPlaceholderRenderings
                        .filter((y: any) => y.name != renderingToUpdate.componentName);
                }

                if (renderingPersonalization.update) {
                    if (!renderingToUpdate) {
                        console.log('Layout is missing rendering named ', renderingPersonalization.name);
                        continue;
                    }

                    if (renderingToUpdate.dataSource != renderingPersonalization.datasource) {

                        renderingToUpdate.dataSource = renderingPersonalization.datasource;

                        await this.populateFields(renderingToUpdate);

                    }
                }
            }

            var personalizationsToAdd = placeholderPersonalization.renderings.filter((i: any) => i.add);

            for await (const renderingPersonalization of personalizationsToAdd) {
                var newRendering = {
                    componentName: renderingPersonalization.name,
                    dataSource: renderingPersonalization.datasource,
                    fields: {},
                    params: [],
                    experiences: {},
                    uid: this.guid()
                };

                await this.populateFields(newRendering);

                elementPlaceholderRenderings.push(newRendering);
            }

            return elementPlaceholderRenderings;
        }
        else {
            return elementPlaceholderRenderings;
        }
    }

    async runRuleActions(ruleEngine: JssRuleEngine, props:any, personalizationRule: any, ruleActions: any){        

        let placeholdersLayout = props.layoutData.sitecore.route?.placeholders;

        if (placeholdersLayout && personalizationRule?.value?.length > 0) {
            
            var ruleEngineContext = ruleEngine.getRuleEngineContext() as any;

            let parsedRule = ruleEngine.parseRuleXml(personalizationRule.value, ruleEngineContext);                        

            ruleEngine.runRuleActions(parsedRule, ruleActions, ruleEngineContext);
            
            if(ruleEngineContext.personalization?.placeholders)
            {                

                var placeholderPersonalizationsKeys = Object.keys(ruleEngineContext.personalization?.placeholders);

                for await (const phName of placeholderPersonalizationsKeys) {                    

                    var placeholderPersonalization = ruleEngineContext.personalization?.placeholders[phName];
                    var placeholderRenderings = placeholdersLayout[phName];
                    var personalizedRenderings =
                        await this.doPersonalizePlaceholder(placeholderPersonalization, placeholderRenderings);
                        
                    placeholdersLayout[phName] = personalizedRenderings;
                }
            }
        }

        return props;

    }

    async personalize(ruleEngine:JssRuleEngine, props: any, personalizationRule: any) {

        let placeholdersLayout = props.layoutData.sitecore.route?.placeholders;

        if (placeholdersLayout && personalizationRule?.value?.length > 0) {

            console.log('Applying personalization')
            
            var ruleEngineContext = ruleEngine.getRuleEngineContext() as any;

            ruleEngine.parseAndRunRule(personalizationRule.value, ruleEngineContext);

            console.log("Rule parsed")

            if(ruleEngineContext.personalization?.placeholders)
            {
                var placeholderPersonalizationsKeys = Object.keys(ruleEngineContext.personalization?.placeholders);

                for await (const phName of placeholderPersonalizationsKeys) {
                    console.log('Personalizing placeholder - ', phName)

                    var placeholderPersonalization = ruleEngineContext.personalization?.placeholders[phName];
                    var placeholderRenderings = placeholdersLayout[phName];
                    var personalizedRenderings =
                        await this.doPersonalizePlaceholder(placeholderPersonalization, placeholderRenderings);
                    placeholdersLayout[phName] = personalizedRenderings;
                }
            }
        }

        return props;
    }
}

exports.PersonalizationHelper = PersonalizationHelper;