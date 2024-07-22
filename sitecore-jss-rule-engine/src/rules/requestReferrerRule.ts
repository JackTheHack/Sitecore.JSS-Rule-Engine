export default function(rule:any, ruleContext:any) {
    var operator = ruleContext.ruleEngine.operatorDefinitions[rule.operatorid];

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + rule.operatorid);
    }        

    var value = rule.Referrer;

    if(!ruleContext.requestContext || 
       !ruleContext.requestContext.referral)
    {
        throw new Error("Request context params are missing for this rule. Try running the personalization in SSR or FE-mode.");
    }

    const operatorContext = {
        parameter1: ruleContext.requestContext.referral,
        parameter2: value
    };

    return operator(operatorContext, ruleContext);
}