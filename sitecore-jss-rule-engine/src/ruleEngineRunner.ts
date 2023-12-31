export default function (parsedRule:any, ruleEngineContext:any) {
    var ruleResult = true;

    ruleEngineContext.ruleExecutionResult = {
        ruleResults: [],
        parsedRule: parsedRule,
    };

    if(!parsedRule)
    {
        return null;
    }

    parsedRule.rules.forEach((rule:any) => {
        var result = true;

        if (rule.conditions && rule.conditions.length > 0) {
            rule.conditions.forEach((condition:any) => {

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
        ruleEngineContext.ruleExecutionResult.ruleResults.push(result);

        if(result && !ruleEngineContext.skipActions && rule.actions && rule.actions.length > 0){            
            ruleEngineContext.ruleEngine.debugMessage('Running actions:')
            ruleEngineContext.ruleEngine.debugMessage(rule.actions)

            rule.actions.forEach((ruleAction:any) => {
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
    ruleEngineContext.ruleExecutionResult.result = ruleResult;

    return ruleResult;
}