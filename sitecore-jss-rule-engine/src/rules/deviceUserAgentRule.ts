import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var operatorId = rule.attributes?.get('operatorid');
    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }    

    var value = rule.attributes?.get('value');
    var userAgent = ruleContext.requestContext?.userAgent;

    var operatorContext = {
        parameter1: userAgent,
        parameter2: value
    }

    return await operator(operatorContext, ruleContext);
}