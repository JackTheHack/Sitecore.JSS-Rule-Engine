import andRule from './andRule'
import orRule from './orRule'
import websiteNameRule from './websiteNameRule'
import dateHasPassedRule from './dateHasPassedRule'
import dayOfMonthRule from './dayOfMonthRule'
import dayOfWeekRule from './dayOfWeekRule'
import monthOfYearRule from './monthOfYearRule'
import deviceQueryStringRule from './deviceQueryStringRule'
import deviceUserAgentRule from './deviceUserAgentRule'
import fieldComparesToRule from './fieldComparesToRule'
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
import { ruleIds } from '../constants'
import { JssRuleEngine } from '../ruleEngine'

export default function(ruleEngine:JssRuleEngine) {
    //conditions
    ruleEngine.registerRule(ruleIds.and, andRule) //covered
    ruleEngine.registerRule(ruleIds.or, orRule) //covered
    
    //context    
    ruleEngine.registerRule(ruleIds.websiteName, websiteNameRule)

    //dates
    ruleEngine.registerRule(ruleIds.dateHasPassed, dateHasPassedRule) //covered
    ruleEngine.registerRule(ruleIds.dayOfMonth, dayOfMonthRule) //covered
    ruleEngine.registerRule(ruleIds.dayOfWeek, dayOfWeekRule) //covered
    ruleEngine.registerRule(ruleIds.monthOfYear, monthOfYearRule) //covered

    //device
    ruleEngine.registerRule(ruleIds.deviceQueryString, deviceQueryStringRule)
    ruleEngine.registerRule(ruleIds.deviceUserAgent, deviceUserAgentRule)

    //fields
    ruleEngine.registerRule(ruleIds.fieldComparesTo, fieldComparesToRule)
    ruleEngine.registerRule(ruleIds.fieldIsEmpty, fieldIsEmptyRule)
    ruleEngine.registerRule(ruleIds.fieldType, fieldTypeRule)
    
    //item hierarchy
    ruleEngine.registerRule(ruleIds.itemAncestorOrSelf, itemAncestorOrSelfRule)
    ruleEngine.registerRule(ruleIds.itemDescendantOrSelf, itemDescendantOrSelfRule)
    ruleEngine.registerRule(ruleIds.itemLevel, itemLevelRule)
    ruleEngine.registerRule(ruleIds.itemPath, itemPathRule)
    ruleEngine.registerRule(ruleIds.itemParentName, itemParentNameRule)
    ruleEngine.registerRule(ruleIds.itemParentTemplate, itemParentTemplateRule)
    ruleEngine.registerRule(ruleIds.itemIsInSiteContext, itemIsInSiteContextRule)

    //item information
    ruleEngine.registerRule(ruleIds.itemBaseTemplate, itemBaseTemplateRule)
    ruleEngine.registerRule(ruleIds.itemId, itemIdRule)
    ruleEngine.registerRule(ruleIds.itemName, itemNameRule)
    ruleEngine.registerRule(ruleIds.itemTemplate, itemTemplateRule)

    //item version
    ruleEngine.registerRule(ruleIds.itemLanguage, itemLanguageRule)

    //request
    ruleEngine.registerRule(ruleIds.requestCookieExists, requestCookieExistsRule) //covered
    ruleEngine.registerRule(ruleIds.requestCookieValue, requestCookieValueRule) //covered
    ruleEngine.registerRule(ruleIds.requestReferrer, requestReferrerRule) //covered
    ruleEngine.registerRule(ruleIds.requestParamExists, requestParamExistsRule) //covered
    ruleEngine.registerRule(ruleIds.requestParamValue, requestParamValueRule) //covered

    //sitecore query
    ruleEngine.registerRule(ruleIds.sitecoreQuery, sitecoreQueryRule)

    //system
    ruleEngine.registerRule(ruleIds.true, trueRule)  //covered

}