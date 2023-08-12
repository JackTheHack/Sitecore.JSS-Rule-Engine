
var test = require('ava')

var JssRuleEngine = require('./ruleEngine').JssRuleEngine;
var ruleMocks = require('./mocks/ruleMocks')

// #region Help functions
function getOperator(operatorId){
    var engine = new JssRuleEngine();
    var operator = engine.operatorDefinitions[operatorId];
    return operator;
}

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

// #endregion

// #region Rules Tests

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

// #endregion

// #region Operator Tests

test('isEqualToOperator', t=> {
    var operator = getOperator('{066602E2-ED1D-44C2-A698-7ED27FD3A2CC}')    

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: 5,
        parameter2: 6
    }
    var result = operator(operatorContext);
    t.false(result);
})

test('isGreaterThanOperator', t=> {
    var operator = getOperator('{B88CD556-082E-4385-BB76-E4D1B565F290}')    

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: 4,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: 6,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);    
})

test('isLessThanOperator', t=> {
    var operator = getOperator('{E362A3A4-E230-4A40-A7C4-FC42767E908F}')

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: 4,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: 6,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);
})

test('isLessThanOrEqualToOperator', t=> {
    var operator = getOperator('{2E1FC840-5919-4C66-8182-A33A1039EDBF}')

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: 4,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: 6,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);
})

test('isNotEqualToOperator', t=> {
    var operator = getOperator('{3627ED99-F454-4B83-841A-A0194F0FB8B4}')

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: 6,
        parameter2: 5
    }
    var result = operator(operatorContext);
    t.true(result);
})

//#endregion