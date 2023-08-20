module.exports = function (parsedRule, ruleEngineContext) {
    var ruleResult = true;

    parsedRule.rules.forEach(rule => {

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

        if(ruleResult && !ruleEngineContext.skipActions && rule.actions && rule.actions.length > 0){            
            rule.actions.forEach(ruleAction => {
                var actionFunction = ruleEngineContext.ruleEngine.commandDefinitions[ruleAction.id];

                if (typeof(actionFunction) === "undefined" || !ruleAction) {
                    throw new Error('Rule definitions missing for id ' + ruleAction.id);
                }

                actionFunction(ruleAction, ruleEngineContext);
            })            
        }

    });

    return ruleResult;
}