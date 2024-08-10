
import test from 'ava'

import { getOperator} from '../_testHelpers'
import { operatorIds } from '../../src/constants'

test('isEqualToOperator', t=> {
    var operator = getOperator(operatorIds.isEqualTo)    

    if (!operator) {
        t.fail("Operator not found.");
        return;
    }

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