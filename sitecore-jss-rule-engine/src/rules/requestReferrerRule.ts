import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var operatorId = rule.attributes?.get('operatorid');
    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }        

    var value = rule.attributes?.get('Referrer');

    if(!ruleContext.requestContext || 
       !ruleContext.requestContext.referral)
    {
        throw new Error("Request context params are missing for this rule. Try running the personalization in SSR or FE-mode.");
    }

    const operatorContext = {
        parameter1: ruleContext.requestContext.referral,
        parameter2: value
    };

    return await operator(operatorContext, ruleContext);
}