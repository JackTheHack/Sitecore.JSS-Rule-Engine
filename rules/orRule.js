module.exports = function (rule, ruleContext) {
    var ruleResult = false;

    console.log('Running OR rule', rule.id);

    if (rule.conditions && rule.conditions.length > 0) {
        rule.conditions.forEach(condition => {

            var conditionId = condition.id ? condition.id : condition.className;

            var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

            if (!condition) {
                throw new Error('Rule definitions missing for id', condition.id);
            }

            var conditionResult = conditionFunction(condition, ruleContext);
            ruleResult = ruleResult || conditionResult;
        });
    }

    return ruleResult;

}