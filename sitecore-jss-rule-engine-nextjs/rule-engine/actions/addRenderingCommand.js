const { render } = require("sass");

module.exports = function(command, ruleContext) {
    //parameters: renderingName, datasourcePath, placeholderName

    var placeholderName = command.placeholderName;
    var renderingName = command.renderingName;

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
            add: true
        };

        placeholder.renderings.push(newPersonalization);
    }
}