import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    let value = rule.attributes?.get('templateid');

    if(!value){
        throw new Error("value or operatorid attribute is missing.") 
    }    
    
    value = value.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

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
    
    var parentValue = graphQlResponse?.data?.item?.parent?.template?.id?.toLowerCase();

    parentValue = parentValue.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

    return await parentValue == value;
}