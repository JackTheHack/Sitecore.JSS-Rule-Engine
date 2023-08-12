//works both for numbers and strings
module.exports = function(operatorContext, ruleContext) {
    return ruleContext.parameter1 != ruleContext.parameter2;
}