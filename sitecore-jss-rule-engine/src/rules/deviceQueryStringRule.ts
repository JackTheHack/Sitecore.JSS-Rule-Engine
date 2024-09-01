import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    
    var value = rule.attributes?.get('value');
    var queryString = ruleContext.requestContext?.queryString;

    if(value && queryString)
    {
        return queryString.indexOf(value) >= 0;
    }

    return false;
}