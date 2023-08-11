//numbers
var isEqualTo = require('./isEqualTo')
var isGreaterThan = require('./isGreaterThan')
var isGreaterThanOrEqualTo = require('./isGreaterThanOrEqualTo')
var isLessThan = require('./isLessThan')
var isLessThanOrEqualTo = require('./isLessThanOrEqualTo')
var isNotEqualTo = require('./isNotEqualTo')
//string
var isStringEqualToIgnoreCase = require('./isStringEqualToIgnoreCase')
var isStringNotEqualToIgnoreCase = require('./isStringNotEqualToIgnoreCase')

var isStringContains = require('./isStringContains')
var isStringRegexMatch = require('./isStringRegexMatch')

var isStringEndsWith = require('./isStringEndsWith')
var isStringStartsWith = require('./isStringStartsWith')




module.exports = function(ruleEngine) {
    //numbers
    ruleEngine.registerOperator('{066602E2-ED1D-44C2-A698-7ED27FD3A2CC}', isEqualTo)
    ruleEngine.registerOperator('{B88CD556-082E-4385-BB76-E4D1B565F290}', isGreaterThan)
    ruleEngine.registerOperator('{814EF7D0-1639-44FD-AEEF-735B5AC14425}', isGreaterThanOrEqualTo)
    ruleEngine.registerOperator('{E362A3A4-E230-4A40-A7C4-FC42767E908F}', isLessThan)
    ruleEngine.registerOperator('{2E1FC840-5919-4C66-8182-A33A1039EDBF}', isLessThanOrEqualTo)
    ruleEngine.registerOperator('{3627ED99-F454-4B83-841A-A0194F0FB8B4}', isNotEqualTo)
    //string
    ruleEngine.registerOperator('{10537C58-1684-4CAB-B4C0-40C10907CE31}', isEqualTo)
    ruleEngine.registerOperator('{537244C2-3A3F-4B81-A6ED-02AF494C0563}', isStringEqualToIgnoreCase)
    ruleEngine.registerOperator('{A6AC5A6B-F409-48B0-ACE7-C3E8C5EC6406}', isNotEqualTo)
    ruleEngine.registerOperator('{6A7294DF-ECAE-4D5F-A8D2-C69CB1161C09}', isStringNotEqualToIgnoreCase)
    ruleEngine.registerOperator('{2E67477C-440C-4BCA-A358-3D29AED89F47}', isStringContains)
    ruleEngine.registerOperator('{F8641C26-EE27-483C-9FEA-35529ECC8541}', isStringRegexMatch)
    ruleEngine.registerOperator('{22E1F05F-A17A-4D0C-B376-6F7661500F03}', isStringEndsWith)
    ruleEngine.registerOperator('{FDD7C6B1-622A-4362-9CFF-DDE9866C68EA}', isStringStartsWith)
}