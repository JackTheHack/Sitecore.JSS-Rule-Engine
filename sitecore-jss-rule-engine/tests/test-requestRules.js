
var test = require('ava')

var { parseAndRun} = require('../testHelpers')


var ruleMocks = require('../mocks/ruleMocks')


// #region Operator Tests


test('requestParameterValueRule', t => {
    var xml = ruleMocks.requestParameterRuleXml;

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=test123"
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.false(result);

    var ruleEngineOptions = {
        requestContext:{
            url: "http://testrequest.com?campaignId=specials"
        }
    };
    var result = parseAndRun(xml, ruleEngineOptions);
    t.true(result);
});