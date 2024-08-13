
import test from 'ava'

import { operatorIds } from '@src/constants'

import { getOperator} from '../_testHelpers'

test('stringContainsOperator', t=> {
    var operator = getOperator(operatorIds.stringContains)    

    if(!operator)
    {
        t.fail("Operator not found.");
        return;
    }

    var operatorContext = {
        parameter1: "Hello, World!",
        parameter2: "World"
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext2 = {
        parameter1: "Hello, World!",
        parameter2: "H7llo"
    }
    var result = operator(operatorContext2);
    t.false(result);
})