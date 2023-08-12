var dayOfWeekList = [
    "{D1172755-83B7-426B-9BA3-F1C5D2CB6EED}", //Monday
    "{139A76F8-583B-4760-BA34-3AB0421044B6}", //Tuesday
    "{8A19F2AA-ABB9-4496-A64E-56CDBE1C2D4C}", //Wedensday
    "{61FE0E28-8723-4895-AF39-E8B977513AD9}", //Thursday
    "{AD163B7C-FCB6-4E92-A04A-024FC080A6A1}", //Friday
    "{B45FD42E-FBDC-4460-A179-DB0B5D22A3EA}", //Sat
    "{04CC0FD2-C5DE-4F7C-B263-B1C88BABA6CD}"  //Sun
]

module.exports = function(rule, ruleContext) {

    var dayList = rule.DaysList;

    var dayIds = dayList.split('|')

    var currentDayOfWeekIndex = ruleContext.dateTime.now.getDay()

    var currentDayId = dayOfWeekList[currentDayOfWeekIndex]

    var result = dayIds.indexOf(currentDayId) >= 0;

    return result;
    
}