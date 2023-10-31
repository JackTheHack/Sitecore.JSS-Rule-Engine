import andRule from './andRule'
import orRule from './orRule'
import websiteNameRule from './websiteNameRule'
import dateHasPassedRule from './dateHasPassedRule'
import dayOfMonthRule from './dayOfMonthRule'
import dayOfWeekRule from './dayOfWeekRule'
import monthOfYearRule from './monthOfYearRule'
import deviceQueryStringRule from './deviceQueryStringRule'
import deviceUserAgentRule from './deviceUserAgentRule'
import fieldComparsToRule from './fieldComparsToRule'
import fieldIsEmptyRule  from './fieldIsEmptyRule'
import fieldTypeRule from './fieldTypeRule'
import itemBaseTemplateRule from './itemBaseTemplateRule'
import itemIdRule from './itemIdRule'
import itemNameRule from './itemNameRule'
import itemTemplateRule from './itemTemplateRule'
import itemAncestorOrSelfRule from './itemAncestorOrSelfRule'
import itemDescendantOrSelfRule from './itemDescendantOrSelfRule'
import itemLevelRule from './itemLevelRule'
import itemPathRule from './itemPathRule'
import itemParentNameRule from './itemParentNameRule'
import itemParentTemplateRule from './itemParentTemplateRule'
import itemIsInSiteContextRule from './itemIsInSiteContextRule'
import requestCookieExistsRule from './requestCookieExistsRule'
import requestCookieValueRule from './requestCookieValueRule'
import requestReferrerRule from './requestReferrerRule'
import requestParamExistsRule from './requestParamExistsRule'
import requestParamValueRule from './requestParamValueRule'
import itemLanguageRule from './itemLanguageRule'
import sitecoreQueryRule from './sitecoreQueryRule'
import trueRule from './trueRule'

export default function(ruleEngine:any) {
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
    ruleEngine.registerRule('{61C016A2-5210-4F1D-A663-BDA18BE487F6}', fieldComparsToRule)
    ruleEngine.registerRule('{DA0D1AEA-0144-4A40-9AF0-3123526C9163}', fieldIsEmptyRule)
    ruleEngine.registerRule('{C186B6C0-C702-4A05-93E4-982F1FCF16AE}', fieldTypeRule)
    //item hierarchy
    ruleEngine.registerRule('{24E8928E-4EB7-44B2-AF62-1893F8715918}', itemAncestorOrSelfRule)
    ruleEngine.registerRule('{7D5DA661-BEF9-441C-B1F7-D80DE3E0972F}', itemDescendantOrSelfRule)
    ruleEngine.registerRule('{858E8CC5-7614-4B6A-8B51-274CFF30088D}', itemLevelRule)
    ruleEngine.registerRule('{4B889F07-94D4-4371-B522-9FFE8AF0BE12}', itemPathRule)
    ruleEngine.registerRule('{A4C74B82-8EBB-4BDA-BE23-B03C5BA43586}', itemParentNameRule)
    ruleEngine.registerRule('{AF2FBD9A-DED2-42B5-B38D-BAC45D301296}', itemParentTemplateRule)
    ruleEngine.registerRule('{188A8AB5-30C2-4EB8-8AA6-9FD83591F9BE}', itemIsInSiteContextRule)

    //item information
    ruleEngine.registerRule('{D0810F9D-734C-452D-BBB6-4730368D68F1}', itemBaseTemplateRule)
    ruleEngine.registerRule('{4F5389E9-79B7-4FE1-A43A-EEA4ECD19C94}', itemIdRule)
    ruleEngine.registerRule('{944E1C68-CAF1-468E-87DC-CE85D168D961}', itemNameRule)
    ruleEngine.registerRule('{5DE6D53E-EA62-4D17-8BDD-FEBCD80AC07B}', itemTemplateRule)

    //item version
    ruleEngine.registerRule('{4F59DE1D-EA1D-4745-99AB-A846452E5532}', itemLanguageRule)

    //request
    ruleEngine.registerRule('{3EC6CAC6-255C-41B3-AA52-D98C9E7368D7}', requestCookieExistsRule)
    ruleEngine.registerRule('{5D59107E-7970-4DEB-A244-473610C59C94}', requestCookieValueRule)
    ruleEngine.registerRule('{5C73B7B9-5BF7-425D-AD48-1F7362AB9092}', requestReferrerRule)
    ruleEngine.registerRule('{C9C75E8D-9D2B-4F60-9629-96A69236B17A}', requestParamExistsRule)
    ruleEngine.registerRule('{74759FE2-7D63-4F63-8952-C3F3C73D58F7}', requestParamValueRule)

    //sitecore query
    ruleEngine.registerRule('{5CD2292C-32AC-4976-AA4F-A741555D22F8}', sitecoreQueryRule)

    //system
    ruleEngine.registerRule('{4888ABBB-F17D-4485-B14B-842413F88732}', trueRule)

}