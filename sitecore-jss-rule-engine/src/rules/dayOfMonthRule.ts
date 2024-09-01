import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {

    ruleContext.ruleEngine?.debugMessage('Running day of month rule', rule)

    var dayNumberValue = rule.attributes?.get('DayNumber');
    var operatorId = rule.attributes?.get('operatorid');    

    var dayNumber = Number.parseInt(dayNumberValue);    

    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }

    if(!ruleContext.dateTime?.now)
    {
        throw new Error("Rule engine context date provider missing.");
    }
    
    var operatorContext = {
        parameter1: ruleContext.dateTime?.now.getDate(),
        parameter2: dayNumber
    }

    return await operator(operatorContext, ruleContext);
}