
var test = require('ava')

var JssRuleEngine = require('./ruleEngine').JssRuleEngine;
var ruleMocks = require('./mocks/ruleMocks')
var ItemProvider = require("./graphQLItemProvider").ItemProvider;

function parseAndRun(xml) {
    var ruleEngineOptions = {

    };
    var ruleEngine = new JssRuleEngine(ruleEngineOptions);    
    //ruleEngine.setSitecoreContext();
    //ruleEngine.setItemProvider();
    //ruleEngine.setRequestContext();
    var ruleResult = ruleEngine.parseAndRunRule(xml);    
    
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

