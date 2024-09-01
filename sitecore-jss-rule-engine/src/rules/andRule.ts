import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function (rule: RuleData, ruleEngineContext: RuleEngineContext) {
    var ruleResult = true;

    ruleEngineContext.ruleEngine?.debugMessage('running AND rule')

    if (rule.conditions && rule.conditions.length > 0) {

        await Promise.all(rule.conditions.map(async(condition)=> {
            var conditionId = condition.id ? condition.id : condition.className;

            var conditionFunction = ruleEngineContext.ruleEngine?.ruleDefinitions.get(conditionId);

            if (!conditionFunction) {
                throw new Error('Rule definitions missing for id ' + conditionId);
            }

            var conditionResult = await conditionFunction(condition, ruleEngineContext);

            if(condition.except)
            {
                conditionResult = !conditionResult;
            }

            if(typeof(conditionResult) !== 'undefined')
            {
                ruleResult = ruleResult && conditionResult;                
            }
        }));       
    }

    return ruleResult;

}