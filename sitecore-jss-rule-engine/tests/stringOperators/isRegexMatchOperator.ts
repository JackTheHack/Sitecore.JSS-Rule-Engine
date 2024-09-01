
import test from 'ava'

import { operatorIds } from '@src/constants'

import { getOperator} from '../_testHelpers'

test('isStringRegexMatch', async t=> {
    var operator = getOperator(operatorIds.isStringRegexMatch)    

    if (!operator) {
        t.fail("Operator not found.");
        return;
    }

    var operatorContext = {
        parameter1: "(https?:\/\/).*",
        parameter2: "https://www.google.com"
    }
    var result = await operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: "(https?:\/\/).*",
        parameter2: "ftp://www.test.com"
    }
    var result = await operator(operatorContext);
    t.false(result);
})