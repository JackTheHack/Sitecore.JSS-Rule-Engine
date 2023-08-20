var helpers = require('../helpers')

module.exports = function(rule, ruleContext) {

    ruleContext.ruleEngine.debugMessage('Running date has passed rule')

    var dateValue = rule.Now;

    var parsedDateValue = helpers.parseSitecoreDate(dateValue);

    ruleContext.ruleEngine.debugMessage('Date parameter value: ', rule.Now, typeof(rule.Now))    
    ruleContext.ruleEngine.debugMessage('Parsed date parameter:', parsedDateValue, typeof(parsedDateValue))

    var dateNowValue = ruleContext.dateTime.now;

    ruleContext.ruleEngine.debugMessage('Date NOW value: ', dateNowValue, typeof(dateNowValue))    

    return parsedDateValue > dateNowValue;
}