var { JssRuleEngine } = require('./ruleEngine');

if(!globalThis.JssEngine)
{
    globalThis.JssEngine = new JssRuleEngine({})
}

module.exports.JssRuleEngine = ruleEngine;