var andRule = require('./andRule')
var orRule = require('./orRule')

module.exports = function(ruleEngine) {
    ruleEngine.registerRule('and', andRule)
    ruleEngine.registerRule('or', orRule)

    //stubbing rule result
    ruleEngine.registerRule('{DA0D1AEA-0144-4A40-9AF0-3123526C9163}', () => { return true;});
    ruleEngine.registerRule('{C186B6C0-C702-4A05-93E4-982F1FCF16AE}', () => { return true;});
    ruleEngine.registerRule('{61C016A2-5210-4F1D-A663-BDA18BE487F6}', () => { return true;});
}