
import test from 'ava'

import { operatorIds } from '../../src/constants'

import { getOperator} from '../_testHelpers'

test('stringEqualsToOperator', t=> {
    var operator = getOperator(operatorIds.isStringEqualTo)    

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "Hello, World!"
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hello, world!"
    }
    var result = operator(operatorContext);
    t.false(result);

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "hello, w&rld!"
    }
    var result = operator(operatorContext);
    t.false(result);
})