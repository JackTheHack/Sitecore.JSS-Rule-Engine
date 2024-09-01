import { RuleData, RuleEngineContext } from "@src/types/ruleEngine";

function getItemFieldValue(ruleContext: RuleEngineContext, fieldName: any){
    var field = ruleContext.sitecoreContext?.route?.fields[fieldName];
    return field?.value;
}

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var operatorId = rule.attributes?.get('operatorid');
    var fieldName = rule.attributes?.get('fieldname');
    var value = rule.attributes?.get('value');

    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }   
    
    var itemFieldValue = getItemFieldValue(ruleContext, fieldName);

    var operatorContext = {
        parameter1: itemFieldValue,
        parameter2: value
    }

    return await operator(operatorContext, ruleContext);
}