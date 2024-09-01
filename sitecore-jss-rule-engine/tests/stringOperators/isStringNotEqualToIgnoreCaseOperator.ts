
import test from 'ava'

import { operatorIds } from '@src/constants'

import { getOperator } from '../_testHelpers'

test('stringNotEqualsToIgnoreCaseOperator', async t => {
    var operator = getOperator(operatorIds.isStringNotEqualToIgnoreCase)

    if (!operator) {
        t.fail("Operator not found.");
        return;
    }

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "Hello, World!"
    }
    var result = await  operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hello, world!"
    }
    var result =await  operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hello, w&rld!"
    }
    var result = await operator(operatorContext);
    t.true(result);
})