import { RuleEngineContext } from "../types/ruleEngine";

export default async function(operatorContext:any, _ruleContext: RuleEngineContext) {
    if(typeof(operatorContext.parameter1) != "string" ||
       typeof(operatorContext.parameter2) != "string"){
        return false;
    }
    return operatorContext.parameter1.indexOf(operatorContext.parameter2) >= 0;
}