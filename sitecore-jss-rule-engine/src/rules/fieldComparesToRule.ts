import { RuleData, RuleEngineContext } from "@src/types/ruleEngine";

function getItemFieldValue(_ruleContext: RuleEngineContext, _fieldName: any){
    return null;
}

export default function(rule:RuleData, ruleContext: RuleEngineContext) {
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

    return operator(operatorContext, ruleContext);
}