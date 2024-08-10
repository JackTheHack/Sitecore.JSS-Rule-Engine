import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default function(rule:RuleData, ruleContext: RuleEngineContext) {
    
    let operatorId = rule.attributes?.get('operatorid');

    var operator = ruleContext.ruleEngine?.operatorDefinitions.get(operatorId);

    if(!operator)
    {
        throw new Error("Operator definition is missing for id " + operatorId);
    }

    
}