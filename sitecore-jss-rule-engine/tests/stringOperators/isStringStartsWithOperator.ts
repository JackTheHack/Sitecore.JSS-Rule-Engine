
import test from 'ava'

import { operatorIds } from '../../src/constants'

import { getOperator} from '../_testHelpers'

test('isStringStartsWithOperator', t=> {
    var operator = getOperator(operatorIds.isStringStartsWith)    

    if(!operator)
        {
            t.fail("Operator not found.");
            return;
        }

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "Hello"
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hello"
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hel^$"
    }
    var result = operator(operatorContext);
    t.false(result);
})