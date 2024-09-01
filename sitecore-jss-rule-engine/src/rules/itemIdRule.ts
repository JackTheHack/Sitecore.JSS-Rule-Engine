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

    value = value.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();

    if(!ruleContext?.sitecoreContext)
    {
        throw new Error("Sitecore context is not setup.") 
    }
    
    var currentItemId = ruleContext.sitecoreContext.itemId;

    if (!currentItemId) {
        throw new Error("Current item is missing");
    }
    
    currentItemId = currentItemId.replaceAll('{','').replaceAll('}','').replaceAll('-','').toUpperCase();    

    var operatorContext = {
        parameter1: value,
        parameter2: currentItemId
    }

    return await operator(operatorContext);  
}