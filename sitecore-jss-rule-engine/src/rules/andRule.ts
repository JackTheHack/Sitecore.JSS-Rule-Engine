import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default function (rule: RuleData, ruleEngineContext: RuleEngineContext) {
    var ruleResult = true;

    ruleEngineContext.ruleEngine?.debugMessage('running AND rule')

    if (rule.conditions && rule.conditions.length > 0) {
        rule.conditions.forEach(condition => {            

            var conditionId = condition.id ? condition.id : condition.className;

            var conditionFunction = ruleEngineContext.ruleEngine?.ruleDefinitions.get(conditionId);

            if (!conditionFunction) {
                throw new Error('Rule definitions missing for id ' + conditionId);
            }

            var conditionResult = conditionFunction(condition, ruleEngineContext);

            if(condition.except)
            {
                conditionResult = !conditionResult;
            }

            ruleResult = ruleResult && conditionResult;                
        });
    }

    return ruleResult;

}