var { JssRuleEngine } = require('./ruleEngine');

if(!global.JssEngine)
{
    global.JssEngine = new JssRuleEngine({})
}

module.exports.getRuleEngineInstance = function(){
    return global.JssEngine;
}

module.exports.JssRuleEngine = JssRuleEngine;