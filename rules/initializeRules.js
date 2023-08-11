var andRule = require('./andRule')
var orRule = require('./orRule')

var websiteNameRule = require('./websiteNameRule')

var dateHasPassedRule = require('./dateHasPassedRule')
var dayOfMonthRule = require('./dayOfMonthRule')
var dayOfWeekRule = require('./dayOfWeekRule')
var monthOfYearRule = require('./monthOfYearRule')

var deviceQueryStringRule = require('./deviceQueryStringRule')
var deviceUserAgentRule = require('./deviceUserAgentRule')

module.exports = function(ruleEngine) {
    //conditions
    ruleEngine.registerRule('and', andRule)
    ruleEngine.registerRule('or', orRule)
    //context
    ruleEngine.registerRule('{3AAE96B8-B1DB-43F4-B6BC-8E9E57E72EDA}', websiteNameRule)
    //dates
    ruleEngine.registerRule('{8A9B001F-FB59-4F0F-B3F3-C6C5360ED451}', dateHasPassedRule)
    ruleEngine.registerRule('{816F72B0-DBE1-4D39-A68E-682FFC31133E}', dayOfMonthRule)
    ruleEngine.registerRule('{C18B0900-ED61-47A8-AEF0-AD6D133512C8}', dayOfWeekRule)
    ruleEngine.registerRule('{F27973B0-4439-48F6-AC06-ED2C2F31AC61}', monthOfYearRule)
    //device
    ruleEngine.registerRule('{F80D5BB0-A9EB-4BE0-850A-EE135B826D2E}', deviceQueryStringRule)
    ruleEngine.registerRule('{FF13BB5F-D493-4AE0-8822-41E19323346E}', deviceUserAgentRule)
    //fields
    
    //item hierarchy

    //item information

    //item version

    //request

    //sitecore query

    //system

    ruleEngine.registerRule('or', orRule)
    ruleEngine.registerRule('or', orRule)




    //stubbing rule result
    ruleEngine.registerRule('{DA0D1AEA-0144-4A40-9AF0-3123526C9163}', () => { return true;});
    ruleEngine.registerRule('{C186B6C0-C702-4A05-93E4-982F1FCF16AE}', () => { return true;});
    ruleEngine.registerRule('{61C016A2-5210-4F1D-A663-BDA18BE487F6}', () => { return true;});
}