var { JssRuleEngine } = require('./ruleEngine');

var isEdgeRuntime = typeof EdgeRuntime == 'string';

if(!isEdgeRuntime && !global.JssEngine)
{
    global.JssEngine = new JssRuleEngine({})
}

module.exports.getRuleEngineInstance = function(){
    if(!isEdgeRuntime)
    {
        return global.JssEngine;
    }
    
    return new JssRuleEngine();
}

module.exports.JssRuleEngine = JssRuleEngine;