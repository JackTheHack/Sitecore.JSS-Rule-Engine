
var test = require('ava')

var ruleMocks = require('../mocks/ruleMocks')

var { getOperator, parseAndRun, parseAndRunWithDateMock} = require('../testHelpers')

// #region Rules Tests

test('trueRule', t => {
    var xml = ruleMocks.trueRuleXml;
    var result = parseAndRun(xml);
    t.true(result);
});

test('exceptTrueRule', t => {
    var xml = ruleMocks.exceptTrueRuleXml;
    var result = parseAndRun(xml);
    t.false(result);
})

test('andRule', t => {
    var xml = ruleMocks.andRuleXml;
    var result = parseAndRun(xml);
    t.false(result);
})

test('orRule', t => {
    var xml = ruleMocks.orRuleXml;    
    var result = parseAndRun(xml);
    t.true(result);
})

// test('ruleWithActions', t => {
//     var dateMock =  new Date(1989,2,1,0,0,0);
    
//     var xml = ruleMocks.ruleWithActionsXml;
//     var result = parseAndRunWithDateMock(xml, dateMock);
//     t.pass(result == true);
// })
// #endregion