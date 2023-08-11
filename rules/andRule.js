module.exports = function (rule, ruleEngineContext) {
    var ruleResult = true;

    if (rule.conditions && rule.conditions.length > 0) {
        rule.conditions.forEach(condition => {

            var conditionId = condition.id ? condition.id : condition.className;

            var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

            if (!conditionFunction) {
                throw new Error('Rule definitions missing for id ' + conditionId);
            }

            var conditionResult = conditionFunction(condition, ruleEngineContext);
            ruleResult = ruleResult && conditionResult;
        });
    }

    return ruleResult;

}