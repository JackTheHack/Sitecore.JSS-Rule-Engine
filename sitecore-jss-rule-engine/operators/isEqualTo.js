//works both for numbers and strings
module.exports = function(operatorContext, ruleContext) {
    return operatorContext.parameter1 == operatorContext.parameter2;
}