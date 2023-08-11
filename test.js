
var test = require('ava')

var ruleEngine = require('./ruleEngine')
var ruleMocks = require('./mocks/ruleMocks')
var ItemProvider = require("./graphQLItemProvider").ItemProvider;

function parseAndRun(xml) {
    var itemProviderOptions = {
    
    };
    var itemProvider = new ItemProvider(itemProviderOptions);
    
    var contextItem = {};
    
    var ruleResult = ruleEngine.runRule(contextItem, xml, itemProvider);
    
    return ruleResult;
}

test('trueRule', t => {
    var xml = ruleMocks.trueRuleXml;
    var result = parseAndRun(xml);
    t.pass(result == true);
});

test('exceptTrueRule', t => {
    var xml = ruleMocks.exceptTrueRuleXml;
    var result = parseAndRun(xml);
    t.pass(result == false);
})

test('andRule', t => {
    var xml = ruleMocks.andRuleXml;
    var result = parseAndRun(xml);
    t.pass(result == false);
})

test('orRule', t => {
    var xml = ruleMocks.orRuleXml;
    var result = parseAndRun(xml);
    t.pass(result == true);
})

