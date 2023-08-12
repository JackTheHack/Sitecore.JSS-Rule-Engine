var helpers = require('../helpers')

module.exports = function(rule, ruleContext) {
    var dateValue = rule.Now;

    var parsedDateValue = helpers.parseSitecoreDate(dateValue);

    var dateNowValue = ruleContext.dateTime.now;

    return parsedDateValue > dateNowValue;
}