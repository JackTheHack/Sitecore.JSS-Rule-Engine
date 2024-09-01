import { RuleEngineContext } from "../types/ruleEngine";

//works both for numbers and strings
export default async function(operatorContext:any, _ruleContext: RuleEngineContext) {
    if(typeof(operatorContext.parameter1) != "string" ||
       typeof(operatorContext.parameter2) != "string"){
        return operatorContext.parameter1 == operatorContext.parameter2;
    }

    return operatorContext.parameter1?.toLowerCase() == operatorContext.parameter2?.toLowerCase();
}