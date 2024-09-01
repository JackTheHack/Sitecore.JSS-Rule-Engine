import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var key = rule.attributes?.get('ParameterName');

    if(!ruleContext.requestContext || 
       !ruleContext.requestContext.urlParams ||
       !ruleContext.requestContext.urlParams.get)
    {
        throw new Error("Request context params are missing for this rule. Try running the personalization in SSR or FE-mode.");
    }

    var urlParam = ruleContext.requestContext.urlParams.get(key);

    return urlParam != null;
}