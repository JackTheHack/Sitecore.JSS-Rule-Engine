module.exports = function (parsedRule, ruleEngineContext) {
    var ruleResult = true;

    parsedRule.rules.forEach(rule => {

        if (rule.conditions && rule.conditions.length > 0) {
            var result = true;
            rule.conditions.forEach(condition => {

                ruleEngineContext.ruleEngine.debugMessage('Running condition:')
                ruleEngineContext.ruleEngine.debugMessage(condition)

                var conditionId = condition.id ? condition.id : condition.className;                

                var conditionFunction = ruleEngineContext.ruleEngine.ruleDefinitions[conditionId];

                if (typeof(conditionFunction) === "undefined" || !condition) {
                    throw new Error('Rule definitions missing for id ' + conditionId);
                }

                var conditionResult = conditionFunction(condition, ruleEngineContext);

                ruleEngineContext.ruleEngine.debugMessage('Condition result:')
                ruleEngineContext.ruleEngine.debugMessage(conditionResult)

                var isExcept = typeof(condition.except) !== "undefined" && condition.except === 'true';

                if(isExcept)
                {
                    conditionResult = !conditionResult;
                }

                result = result && conditionResult;
            });
        }

        ruleResult = ruleResult && result;

        ruleEngineContext.ruleEngine.debugMessage('Rule result:', ruleResult);

        if(ruleResult && !ruleEngineContext.skipActions && rule.actions && rule.actions.length > 0){            
            ruleEngineContext.ruleEngine.debugMessage('Running actions:')
            ruleEngineContext.ruleEngine.debugMessage(rule.actions)

            rule.actions.forEach(ruleAction => {
                var actionFunction = ruleEngineContext.ruleEngine.commandDefinitions[ruleAction.id];

                if (typeof(actionFunction) === "undefined" || !ruleAction) {
                    throw new Error('Rule definitions missing for id ' + ruleAction.id);
                }

                ruleEngineContext.ruleEngine.debugMessage(actionFunction)

                actionFunction(ruleAction, ruleEngineContext);
            })            
        }

    });

    ruleEngineContext.ruleEngine.debugMessage('Rule execution result: ', ruleResult)

    return ruleResult;
}