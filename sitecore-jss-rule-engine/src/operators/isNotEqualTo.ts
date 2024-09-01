import { RuleEngineContext } from "../types/ruleEngine";

//works both for numbers and strings
export default async function(operatorContext:any, _ruleContext: RuleEngineContext) {
    return operatorContext.parameter1 != operatorContext.parameter2;
}