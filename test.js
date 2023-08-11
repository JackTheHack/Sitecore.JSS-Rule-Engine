var ruleEngine = require('./ruleEngine')
var xmlStub = require('./ruleXmlStub')

const ItemProvider = require("./itemProvider").ItemProvider;

console.log('Starting test.');

var itemProviderOptions = {

};
var itemProvider = new ItemProvider(itemProviderOptions);

var contextItem = {};

var ruleResult = ruleEngine.runRule(contextItem, xmlStub, itemProvider);

console.log('Rule result - ', ruleResult);