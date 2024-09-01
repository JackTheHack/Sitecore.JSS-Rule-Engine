
import test from 'ava'

import { getOperator} from '../_testHelpers'
import { operatorIds } from '@src/constants'

test('isEqualToOperator', async t=> {
    var operator = getOperator(operatorIds.isEqualTo)    

    if (!operator) {
        t.fail("Operator not found.");
        return;
    }

    var operatorContext = {
        parameter1: 5,
        parameter2: 5
    }
    var result = await operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: 5,
        parameter2: 6
    }
    var result = await operator(operatorContext);
    t.false(result);
})