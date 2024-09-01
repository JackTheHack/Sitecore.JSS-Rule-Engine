
import { JssRuleEngine }  from '@src/ruleEngine';
import { RuleEngineContext } from '@src/types/ruleEngine';

// #region Help functions
export function getOperator(operatorId:string){
    var engine = new JssRuleEngine();
    var operator = engine.operatorDefinitions.get(operatorId);
    return operator;
}

export async function parseAndRun(xml:string, options?: RuleEngineContext) {    

    let ruleEngineOptions = options ? options : {} ;    
    var ruleEngine = new JssRuleEngine(ruleEngineOptions);        
    ruleEngine.setRequestContext(ruleEngineOptions.requestContext);
    var ruleResult = await ruleEngine.parseAndRunRule(xml);        
    return ruleResult;
}

export async function parseAndRunWithDateMock(xml:string, dateMock:Date) {    
    
    let ruleEngineOptions = {
        mockDate: dateMock        
    };    

    return await parseAndRun(xml, ruleEngineOptions);
}

// #endregion
