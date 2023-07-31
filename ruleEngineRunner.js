module.exports = function (parsedRule, ruleEngineContext) {
    console.log('Running rule for an item');

    console.log(ruleContext);
    console.log(parsedRule);

    var ruleResult = true;

    parsedRule.rules.forEach(rule => {

        console.log('Running rule with id', rule.id);

        if (rule.conditions && rule.conditions.length > 0) {
            var result = true;
            rule.conditions.forEach(condition => {

                var conditionId = condition.id ? condition.id : condition.className;

                var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

                if (!condition) {
                    throw new Error('Rule definitions missing for id', condition.id);
                }

                var conditionResult = conditionFunction(condition, ruleContext);
                result = result && conditionResult;
            });
        }

        ruleResult = ruleResult && result;

    });

    return ruleResult;
}