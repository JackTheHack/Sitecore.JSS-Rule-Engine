var xmlParser =  require('xml-js');

function parseUnionCondition(conditionXmlNode) {
    var parsedCondition = {
        conditions: [],
        className: conditionXmlNode.name
    }

    var childNodes = conditionXmlNode.elements;

    childNodes.forEach(ruleXmlNode => {
        var parsedRule = parseCondition(ruleXmlNode);
        if(parsedRule)
        {
            parsedCondition.conditions.push(parsedRule);
        }else
        {
            throw new Error('Condition wasnt parsed', ruleXmlNode);
        }        
    });

    return parsedCondition;
}

function parseRegularCondition(conditionXmlNode) {
    var parsedCondition = {        
        className: "condition"
    }

    var attributeKeys = Object.keys(conditionXmlNode.attributes);

    attributeKeys.forEach(attr => {
        parsedCondition[attr] = conditionXmlNode.attributes[attr];
    });
    return parsedCondition;
}

function parseCondition(conditionXmlNode) {
    if(conditionXmlNode.name == "or" || conditionXmlNode.name == "and")
    {
        return parseUnionCondition(conditionXmlNode);
    }

    return parseRegularCondition(conditionXmlNode);
}

module.exports = function(ruleXml){
   
    ruleXml = ruleXml.replace('\t','').replace('\n','').replace('\r','');

    console.log('Parsing rule XML');

    xmlDoc = xmlParser.xml2js(ruleXml,  {compact: false, spaces: 4});

    console.log(xmlDoc);

    var rulesetNode = xmlDoc.elements.find(x => x.type == "element" && x.name == "ruleset");    

    if(!rulesetNode || 
        rulesetNode.type != "element" || 
        rulesetNode.name != "ruleset")
    {
        throw new Error("Ruleset node is missing.");
    }

    console.log(rulesetNode);

    var parsedRule = {
        rules: []
    };

    var rulesNodes = rulesetNode.elements.filter(x => x.type == "element" && x.name == "rule");

    if(!rulesNodes)
    {
        console.log('Rule nodes are missing.');
        return false;
    }

    rulesNodes.forEach(ruleXmlNode => {

        var rule = {
            conditions: []
        };

        var attributeKeys = Object.keys(ruleXmlNode.attributes);

        attributeKeys.forEach(attr => {
            rule[attr] = ruleXmlNode.attributes[attr];
        });

        var conditionsRootNode = ruleXmlNode.elements.find(x => x.type == "element" && x.name == "conditions");

        conditionsRootNode.elements.filter(x => x.type == "element").forEach(conditionXmlNode => {
            var parsedCondition = parseCondition(conditionXmlNode, rule);
            if(parsedCondition)
            {
                rule.conditions.push(parsedCondition);
            }else {
                throw new Error('Condition wasnt parsed', conditionXmlNode);
            }
        });

        parsedRule.rules.push(rule);        
    });

    return parsedRule;
}