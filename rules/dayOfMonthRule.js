module.exports = function(rule, ruleContext) {

    ruleContext.ruleEngine.debugMessage('Running day of month rule', rule)

    var dayNumberValue = rule.DayNumber;
    var operatorId = rule.operatorid;    

    var dayNumber = Number.parseInt(dayNumberValue);

    var operator = ruleContext.ruleEngine.operatorDefinitions[operatorId];

    if(!operator)
    {
        throw new Error("Operator definition is missing for id ", rule.operatorId);
    }
    
    var operatorContext = {
        parameter1: ruleContext.dateTime.now.getDate(),
        parameter2: dayNumber
    }

    return operator(operatorContext, ruleContext);
}