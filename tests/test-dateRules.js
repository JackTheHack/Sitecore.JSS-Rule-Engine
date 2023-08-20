
var test = require('ava')

var ruleMocks = require('../mocks/ruleMocks')

var { getOperator, parseAndRun, parseAndRunWithDateMock} = require('../testHelpers')

// #region Rules Tests

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

// #endregion