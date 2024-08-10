export function parseSitecoreDate(stringVal:any) : Date {

    if(!stringVal || stringVal.length < 15)
    {
        throw "Invalid date format"
    }

    var year = Number.parseInt(stringVal.substring(0,4))
    var month = Number.parseInt(stringVal.substring(4,6))
    var day = Number.parseInt(stringVal.substring(6,8))

    var hour =  Number.parseInt(stringVal.substring(9,11))
    var minutes =  Number.parseInt(stringVal.substring(11,13))
    var seconds =  Number.parseInt(stringVal.substring(13,15))

    return new Date(year, month, day, hour, minutes, seconds, 0);
}