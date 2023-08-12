
var test = require('ava')

var JssRuleEngine = require('./ruleEngine').JssRuleEngine;
var ruleMocks = require('./mocks/ruleMocks')
var ItemProvider = require("./graphQLItemProvider").ItemProvider;

function parseAndRun(xml, ruleEngineOptions) {    

    var ruleEngineOptions = ruleEngineOptions ? ruleEngineOptions : {};

    var ruleEngine = new JssRuleEngine(ruleEngineOptions);        
    var ruleResult = ruleEngine.parseAndRunRule(xml);    
    
    return ruleResult;
}

function parseAndRunWithDateMock(xml, dateMock) {    
    var dateObjMock = {
        now: dateMock
    };

    ruleEngineOptions = {
        mockDate: dateObjMock
    };

    return parseAndRun(xml, ruleEngineOptions);
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

test('dateHasPassedRule', t => {

    var dateMock =  new Date(1989,1,1,0,0,0);

    var xml = ruleMocks.dateHasPassedRuleXml;
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);

    var dateMock =  new Date(1991,1,1,0,0,0);

    var xml = ruleMocks.dateHasPassedRuleXml;
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == false);
})
