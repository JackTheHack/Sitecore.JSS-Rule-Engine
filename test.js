var ruleEngine = require('./ruleEngine')
var xmlStub = require('./ruleXmlStub')

console.log('Starting test.');

var ruleResult = ruleEngine.runRule({}, xmlStub);
console.log('Rule result - ', ruleResult);