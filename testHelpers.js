
var JssRuleEngine = require('./ruleEngine').JssRuleEngine;

// #region Help functions
function getOperator(operatorId){
    var engine = new JssRuleEngine();
    var operator = engine.operatorDefinitions[operatorId];
    return operator;
}

function parseAndRun(xml, ruleEngineOptions) {    

    var ruleEngineOptions = ruleEngineOptions ? ruleEngineOptions : {};    
    var ruleEngine = new JssRuleEngine(ruleEngineOptions);        
    var ruleResult = ruleEngine.parseAndRunRule(xml);    
    
    return ruleResult;
}

function parseAndRunWithDateMock(xml, dateMock) {    
    var dateObjMock = {
        now: dateMock
    };

    ruleEngineOptions = {
        mockDate: dateObjMock        
    };    

    return parseAndRun(xml, ruleEngineOptions);
}

// #endregion

module.exports.getOperator = getOperator;
module.exports.parseAndRun = parseAndRun;
module.exports.parseAndRunWithDateMock = parseAndRunWithDateMock;
