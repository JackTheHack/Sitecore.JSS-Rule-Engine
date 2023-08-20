module.exports = function (rule, ruleEngineContext) {
    var ruleResult = false;

    if (rule.conditions && rule.conditions.length > 0) {
        rule.conditions.forEach(condition => {

            var conditionId = typeof(condition.id) !== "undefined" && condition.id ? condition.id : condition.className;

            var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

            if (!conditionFunction) {
                throw new Error('Rule definitions missing for id ' + conditionId);
            }

            var conditionResult = conditionFunction(condition, ruleEngineContext);

            var isExcept = typeof(condition.except) !== "undefined" && condition.except === 'true';

            if(isExcept)
            {
                conditionResult = !conditionResult;
            }

            ruleResult = ruleResult || conditionResult;
        });
    }

    return ruleResult;

}