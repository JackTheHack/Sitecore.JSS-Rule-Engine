"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(command, ruleContext) {
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
    var rendering = placeholder.renderings.find(function (i) { return i.name == renderingName; });
    if (rendering) {
        //update personalization for the rendering
        rendering.hide = true;
    }
    else {
        //add new personalization
        var newPersonalization = {
            name: renderingName,
            hide: true
        };
        placeholder.renderings.push(newPersonalization);
    }
}
exports.default = default_1;
