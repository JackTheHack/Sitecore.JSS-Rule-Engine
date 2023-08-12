
var test = require('ava')

var { getOperator, parseAndRun, parseAndRunWithDateMock} = require('../testHelpers')

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