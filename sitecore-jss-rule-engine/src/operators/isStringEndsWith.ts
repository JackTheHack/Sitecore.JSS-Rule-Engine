export default function(operatorContext:any, _ruleContext:any) {
    if(typeof(operatorContext.parameter1) != "string" ||
       typeof(operatorContext.parameter2) != "string"){
        return false;
    }

    return operatorContext.parameter1.endsWith(operatorContext.parameter2);
}