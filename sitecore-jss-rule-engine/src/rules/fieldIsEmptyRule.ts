import { RuleData, RuleEngineContext } from "../types/ruleEngine";

function getItemFieldValue(ruleContext: RuleEngineContext, fieldName: any){
    var field = ruleContext.sitecoreContext?.route?.fields[fieldName];
    return field?.value;
}

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {
    var fieldName = rule.attributes?.get('fieldname');        

    if(!fieldName)
    {
        return false;
    }    

    var fieldValue = getItemFieldValue(ruleContext, fieldName);

    return !fieldValue || fieldValue == '';
}