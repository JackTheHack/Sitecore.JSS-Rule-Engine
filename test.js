
var test = require('ava')

var ruleEngine = require('./ruleEngine')
var xmlStub = require('./ruleXmlStub')    
var ItemProvider = require("./itemProvider").ItemProvider;

test('Parse and run rule', t => {

    console.log('Starting test.');
    
    var itemProviderOptions = {
    
    };
    var itemProvider = new ItemProvider(itemProviderOptions);
    
    var contextItem = {};
    
    var ruleResult = ruleEngine.runRule(contextItem, xmlStub, itemProvider);
    
    console.log('Rule result - ', ruleResult);

    t.pass();
});

