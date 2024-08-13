import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default function(rule:RuleData, _ruleContext: RuleEngineContext) {
    var fieldName = rule.attributes?.get('fieldname');    

    if(!fieldName)
    {
        return false;
    }    

    return true;
}