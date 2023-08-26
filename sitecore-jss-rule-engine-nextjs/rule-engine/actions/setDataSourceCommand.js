module.exports = function(command, ruleContext) {
    //parameters: renderingName, datasourcePath, placeholderName

    var placeholderName = command.placeholderName;
    var renderingName = command.renderingName;
    var datasourcePath = command.datasourcePath;

    ruleContext.personalization = ruleContext.personalization ? ruleContext.personalization : {
        placeholders: []
    };

    var placeholder = ruleContext.personalization.placeholders[placeholderName];

    var placeholder = placeholder ? placeholder : {
        name: placeholderName,
        renderings: []
    };

    ruleContext.personalization.placeholders[placeholderName] = placeholder;

    var rendering = placeholder.renderings.find(x => x.name == renderingName);

    if(rendering)
    {
        //update personalization for the rendering
        rendering.datasource = datasourcePath;
    }else{
        //add new personalization
        var newPersonalization = {
            name: renderingName, 
            datasource: datasourcePath,
            update: true
        };
        placeholder.renderings.push(newPersonalization);
    }
}