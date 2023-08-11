//works both for numbers and strings
module.exports = function(ruleContext) {
    return ruleContext.parameter1 != ruleContext.parameter2;
}