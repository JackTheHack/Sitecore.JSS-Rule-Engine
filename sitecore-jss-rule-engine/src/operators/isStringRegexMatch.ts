import { RuleEngineContext } from "../types/ruleEngine";

export default async function(operatorContext:any, _ruleContext: RuleEngineContext) {
    if(typeof(operatorContext.parameter1) != "string" ||
       typeof(operatorContext.parameter2) != "string"){
        return false;
    }

    let regex = new RegExp(operatorContext.parameter1);
    return regex.test(operatorContext.parameter2);
}