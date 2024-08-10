//numbers
import isEqualTo from './isEqualTo'
import isGreaterThan from './isGreaterThan'
import isGreaterThanOrEqualTo from './isGreaterThanOrEqualTo'
import isLessThan from './isLessThan'
import isLessThanOrEqualTo from './isLessThanOrEqualTo'
import isNotEqualTo from './isNotEqualTo'
//string
import isStringEqualToIgnoreCase from './isStringEqualToIgnoreCase'
import isStringNotEqualToIgnoreCase from './isStringNotEqualToIgnoreCase'

import isStringContains from './isStringContains'
import isStringRegexMatch from './isStringRegexMatch'

import isStringEndsWith from './isStringEndsWith'
import isStringStartsWith from './isStringStartsWith'

import { operatorIds } from '../constants'
import { JssRuleEngine } from '../ruleEngine'

export default function(ruleEngine:JssRuleEngine) {
    //numbers
    ruleEngine.registerOperator(operatorIds.isEqualTo, isEqualTo) //covered
    ruleEngine.registerOperator(operatorIds.isGreaterThan, isGreaterThan) //covered
    ruleEngine.registerOperator(operatorIds.isGreaterThanOrEqualTo, isGreaterThanOrEqualTo) //covered
    ruleEngine.registerOperator(operatorIds.isLessThan, isLessThan) //covered
    ruleEngine.registerOperator(operatorIds.isLessThanOrEqualTo, isLessThanOrEqualTo) //covered
    ruleEngine.registerOperator(operatorIds.isNotEqualTo, isNotEqualTo) //covered
    //string
    ruleEngine.registerOperator(operatorIds.isStringEqualTo, isEqualTo) //covered
    ruleEngine.registerOperator(operatorIds.isStringEqualToIgnoreCase, isStringEqualToIgnoreCase) //covered
    ruleEngine.registerOperator(operatorIds.isStringNotEqualTo, isNotEqualTo) //covered
    ruleEngine.registerOperator(operatorIds.isStringNotEqualToIgnoreCase, isStringNotEqualToIgnoreCase) //covered
    ruleEngine.registerOperator(operatorIds.stringContains, isStringContains) //covered
    ruleEngine.registerOperator(operatorIds.isStringRegexMatch, isStringRegexMatch) //covered
    ruleEngine.registerOperator(operatorIds.isStringEndsWith, isStringEndsWith)
    ruleEngine.registerOperator(operatorIds.isStringStartsWith, isStringStartsWith)
}