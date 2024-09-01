import { parseSitecoreDate } from "../helpers";
import { RuleData, RuleEngineContext } from "../types/ruleEngine";

export default async function (rule:RuleData, ruleContext: RuleEngineContext) {

    ruleContext.ruleEngine?.debugMessage('Running date has passed rule')

    var dateValue = rule.attributes?.get('Now');

    var parsedDateValue = parseSitecoreDate(dateValue);

    ruleContext.ruleEngine?.debugMessage('Date parameter value: ', dateValue, typeof (dateValue))
    ruleContext.ruleEngine?.debugMessage('Parsed date parameter:', parsedDateValue, typeof (parsedDateValue))

    if (!ruleContext.dateTime?.now) {
        throw new Error("Rule engine context date provider missing.");
    }

    var dateNowValue = ruleContext.dateTime.now;

    ruleContext.ruleEngine?.debugMessage('Date NOW value: ', dateNowValue, typeof (dateNowValue))

    return dateNowValue >= parsedDateValue;
}