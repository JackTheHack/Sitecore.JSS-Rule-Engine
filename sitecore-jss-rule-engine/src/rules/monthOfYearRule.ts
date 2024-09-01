import { RuleData, RuleEngineContext } from "../types/ruleEngine";

var monthsList = [
    "{3C14D331-85BB-464D-B255-2603B6451923}", //Jan
    '{5F6CD10B-494F-423D-9925-79A51C40DDEE}', //Feb
    '{3F770C25-87E2-4C93-B75D-5BE1C3EE812F}', //Mar
    '{24A6641F-A9EE-42FE-A3E7-D9D81EC1A803}', //Apr
    '{53173ABB-B8AB-404B-BB30-AB625A8236CE}', //May
    '{877C9B7B-5CBA-4E95-9E45-195181B85266}', //Jun
    '{E6D8E875-3131-4D32-8F67-A3CD32D7AF86}', //Jul
    '{A9EEBAE5-D9C5-4F14-8212-67AEFA550608}', //Aug
    '{64116941-23DE-4D84-B00E-8D2919FD1821}', //Sep
    '{5807CD23-1EE7-4A59-AB3C-6C0D7783FDF7}', //Oct
    '{E8C4C101-EB3A-4B83-8508-B0B5190F4FFC}', //Nov
    '{E8C4C101-EB3A-4B83-8508-B0B5190F4FFC}'  //Dec
]

export default async function(rule:RuleData, ruleContext: RuleEngineContext) {

    var monthId = rule.attributes?.get('Month');

    if (!ruleContext.dateTime?.now) {
        throw new Error("Rule engine context date provider missing.");
    }

    var currentDayOfMonthIndex = ruleContext.dateTime?.now.getMonth()

    var currentMonthId = monthsList[currentDayOfMonthIndex]

    var result = monthId == currentMonthId;

    return result;    
}