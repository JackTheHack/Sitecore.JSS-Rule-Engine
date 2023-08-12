
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
    var xml = ruleMocks.dateHasPassedRuleXml;
    
    var dateMock =  new Date(1989,1,1,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);

    var dateMock =  new Date(1991,1,1,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == false);
})

test('dayOfMonthRule', t => {
    var xml = ruleMocks.dayOfMonthRuleXml;

    var dateMock =  new Date(1989,1,5,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);

    var dateMock =  new Date(1989,1,6,0,0,0);
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == false);
})

test('dayOfWeekRule', t=> {
    var xml = ruleMocks.dayOfWeekRuleXml;

    var dateMock =  new Date(2023,8,12,0,0,0);    
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);

    var dateMock =  new Date(2023,8,13,0,0,0);    
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);

    var dateMock =  new Date(2023,8,14,0,0,0);    
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == false);
})

test('monthOfYearRule', t=> {
    var dateMock =  new Date(1989,2,1,0,0,0);

    var xml = ruleMocks.monthOfYearRuleXml;
    var result = parseAndRunWithDateMock(xml, dateMock);
    t.pass(result == true);
})
