var andRule = require('./andRule')
var orRule = require('./orRule')

var itemFieldConditionRule = require('./ruleExample')

module.exports = function(ruleEngine) {
    ruleEngine.registerRule('and', andRule)
    ruleEngine.registerRule('and', orRule)

    ruleEngine.registerRule('id1', itemFieldConditionRule);
}