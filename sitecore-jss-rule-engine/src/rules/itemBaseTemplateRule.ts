import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    let templateid = rule.attributes?.get('templateid');

    if(!templateid){
        throw new Error("value or operatorid attribute is missing.") 
    }    
        
    templateid = templateid.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

    if(!ruleContext?.sitecoreContext?.itemProvider)
    {
        throw new Error("Sitecore context or GraphQL provider is not setup.") 
    }
    
    var currentItemId = ruleContext.sitecoreContext.itemId;
    var graphQlProvider = ruleContext.sitecoreContext.itemProvider;

    if(!currentItemId)
    {
        throw new Error("Current item is missing");
    }

    var graphQlResponse = await graphQlProvider.getItemById(currentItemId);

    if(!graphQlResponse){
        throw new Error("GraphQL query failed.");
    }

    
    var baseTemplates = graphQlResponse?.data?.item?.template?.baseTemplates;

    var hasBaseTemplate = baseTemplates.some((x:any) => x.id == templateid);

    return hasBaseTemplate;
}