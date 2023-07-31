var commandExample = require('./commandExample')

module.exports = function(ruleEngine) {
    ruleEngine.registerCommand('command1', commandExample)
}