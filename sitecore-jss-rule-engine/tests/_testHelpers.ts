
import { JssRuleEngine }  from '../src/ruleEngine';

// #region Help functions
export function getOperator(operatorId:any){
    var engine = new JssRuleEngine();
    var operator = engine.operatorDefinitions[operatorId];
    return operator;
}

export function parseAndRun(xml:any, ruleEngineOptions:any = null) {    

    var ruleEngineOptions = ruleEngineOptions ? ruleEngineOptions : {};    
    var ruleEngine = new JssRuleEngine(ruleEngineOptions);        
    var ruleResult = ruleEngine.parseAndRunRule(xml);    
    
    return ruleResult;
}

export function parseAndRunWithDateMock(xml:any, dateMock:any) {    
    var dateObjMock = {
        now: dateMock
    };

    let ruleEngineOptions = {
        mockDate: dateObjMock        
    } as any;    

    return parseAndRun(xml, ruleEngineOptions);
}

// #endregion
