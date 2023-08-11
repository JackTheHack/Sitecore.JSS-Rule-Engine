module.exports = function (parsedRule, ruleEngineContext) {
    console.log('Running rule for an item');

    //console.log(ruleEngineContext);
    console.log(parsedRule);

    var ruleResult = true;

    parsedRule.rules.forEach(rule => {

        console.log('Running rule ', rule);

        if (rule.conditions && rule.conditions.length > 0) {
            var result = true;
            rule.conditions.forEach(condition => {

                var conditionId = condition.id ? condition.id : condition.className;

                var isExcept = typeof(condition.except) !== "undefined" && condition.except === 'true';

                var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

                if (typeof(conditionFunction) === "undefined" || !condition) {
                    throw new Error('Rule definitions missing for id ' + conditionId);
                }

                var conditionResult = conditionFunction(condition, ruleEngineContext);

                if(isExcept)
                {
                    conditionResult = !conditionResult;
                }

                result = result && conditionResult;
            });
        }

        ruleResult = ruleResult && result;

    });

    return ruleResult;
}