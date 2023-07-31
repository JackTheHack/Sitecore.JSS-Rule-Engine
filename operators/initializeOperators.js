var operatorExample = require('./operatorExample')

module.exports = function(ruleEngine) {
    ruleEngine.registerOperator('operator1', operatorExample)
}