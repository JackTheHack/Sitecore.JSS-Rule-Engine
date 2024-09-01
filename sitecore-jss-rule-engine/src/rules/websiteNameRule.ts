import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var operatorId = rule.attributes?.get('operatorid');
    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id - " + operatorId);
    }

    if(!ruleContext.sitecoreContext)
    {
        throw new Error("Sitecore context is missing.");
    }
    
    var value = rule.attributes?.get('value');
    var currentSiteName = ruleContext.sitecoreContext?.siteName;

    var operatorContext = {
        parameter1: currentSiteName,
        parameter2: value
    }

    return await operator(operatorContext, ruleContext);
}