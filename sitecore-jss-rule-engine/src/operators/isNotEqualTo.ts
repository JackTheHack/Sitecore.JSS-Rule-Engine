//works both for numbers and strings
export default function(operatorContext:any, _ruleContext:any) {
    return operatorContext.parameter1 != operatorContext.parameter2;
}