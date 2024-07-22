
import test from 'ava'

import { getOperator} from '../_testHelpers'
import { operatorIds } from '../../src/constants'

test('isLessThanOperator', t=> {
    var operator = getOperator(operatorIds.isLessThan)

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