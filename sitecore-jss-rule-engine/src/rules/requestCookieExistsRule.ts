export default function(rule:any, ruleContext:any) {
    var key = rule.ParameterName;

    if(!ruleContext.requestContext || 
       !ruleContext.requestContext.cookies ||
       !ruleContext.requestContext.cookies.get)
    {
        throw new Error("Request context params are missing for this rule. Try running the personalization in SSR or FE-mode.");
    }

    var urlParam = ruleContext.requestContext.cookies.get(key);

    return urlParam != null;   
}