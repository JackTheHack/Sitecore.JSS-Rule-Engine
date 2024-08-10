
import test from 'ava'

import { operatorIds } from '../../src/constants'

import { getOperator } from '../_testHelpers'

test('isStringEndsWithOperator', t => {
    var operator = getOperator(operatorIds.isStringEndsWith)

    if (!operator) {
        t.fail("Operator not found.");
        return;
    }

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "World!"
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "world!"
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "wo#&d!"
    }
    var result = operator(operatorContext);
    t.false(result);
})