
import test from 'ava'

import { operatorIds } from '../../src/constants'

import { getOperator} from '../_testHelpers'

test('isStringRegexMatch', t=> {
    var operator = getOperator(operatorIds.isStringRegexMatch)    

    var operatorContext = {
        parameter1: "(https?:\/\/).*",
        parameter2: "https://www.google.com"
    }
    var result = operator(operatorContext);
    t.true(result);

    var operatorContext = {
        parameter1: "(https?:\/\/).*",
        parameter2: "ftp://www.test.com"
    }
    var result = operator(operatorContext);
    t.false(result);
})