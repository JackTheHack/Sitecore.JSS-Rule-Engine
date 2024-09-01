import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    let value = rule.attributes?.get('value');
    let operatorId = rule.attributes?.get('operatorid');    

    if(!value || !operatorId){
        throw new Error("value or operatorid attribute is missing.") 
    }    
    
    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }   

    value = value.toLowerCase();    

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

    
    var parentName = graphQlResponse?.data?.item?.parent?.name?.toLowerCase();

    var operatorContext = {
        parameter1: parentName,
        parameter2: value
    }

    return await operator(operatorContext);
}