function parseUnionCondition(conditionXmlNode) {
    var parsedCondition = {
        conditions: [],
        className: conditionXmlNode.nodeName
    }

    var childNodes = conditionXmlNode.childNodes;

    childNodes.forEach(ruleXmlNode => {
        var parsedRule = parseCondition(ruleXmlNode);
        parsedCondition.rules.push(parsedRule);        
    });

    return parsedCondition;
}

function parseRegularCondition(conditionXmlNode) {
    var parsedCondition = {        
        className: "condition"
    }

    conditionXmlNode.attributes.forEach(attr => {
        parsedCondition[attr.name] = attr.value;
    });
}

function parseCondition(conditionXmlNode) {
    if(conditionXmlNode.nodeName == "or" || conditionXmlNode.nodeName == "and")
    {
        return parseUnionCondition(conditionXmlNode);
    }

    return parseRegularCondition(conditionXmlNode);
}

module.exports = function(ruleXml){
   
    ruleXml = ruleXml.replace('\t','').replace('\n','').replace('\r','');

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(ruleXml,"text/xml");

    var rulesetNode = xmlDoc.getElementsByTagName('ruleset')[0];    

    if(!rulesetNode)
    {
        return null;
    }

    var parsedRule = {
        rules: []
    };

    var rulesNodes = rulesetNode.getElementsByTagName('rule');

    rulesNodes.forEach(ruleXmlNode => {

        var rule = {
            conditions: []
        };

        var conditionsNodes = ruleXmlNode.getElementsByTagName('conditions');

        conditionsNodes.forEach(conditionXmlNode => {
            var parsedCondition = parseCondition(conditionXmlNode, rule);
            rule.conditions.push(parsedCondition);
        });

        parsedRule.rules.push(rule);        
    });

    return parsedRule;
}