import { RuleEngineContext } from "../types/ruleEngine";

export default async function(operatorContext:any, _ruleContext: RuleEngineContext) {
    return operatorContext.parameter1 <= operatorContext.parameter2;
}