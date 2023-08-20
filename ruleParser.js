var xmlParser =  require('xml-js');

function parseUnionCondition(conditionXmlNode, ruleEngineContext) {
    var parsedCondition = {
        conditions: [],
        className: conditionXmlNode.name
    }

    var childNodes = conditionXmlNode.elements;

    childNodes.forEach(ruleXmlNode => {
        var parsedRule = parseCondition(ruleXmlNode, ruleEngineContext);
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

function parseRegularCondition(conditionXmlNode, ruleEngineContext) {
    var parsedCondition = {        
        className: "condition"
    }

    var attributeKeys = Object.keys(conditionXmlNode.attributes);

    attributeKeys.forEach(attr => {
        parsedCondition[attr] = conditionXmlNode.attributes[attr];
    });

    return parsedCondition;
}

function parseAction(actionXmlNode, ruleEngineContext) {
    var parsedAction = {        
        className: "action"
    }

    var attributeKeys = Object.keys(actionXmlNode.attributes);

    attributeKeys.forEach(attr => {
        parsedAction[attr] = actionXmlNode.attributes[attr];
    });

    return parsedAction;
}

function parseCondition(conditionXmlNode, ruleEngineContext) {
    if(conditionXmlNode.name == "or" || conditionXmlNode.name == "and")
    {
        return parseUnionCondition(conditionXmlNode, ruleEngineContext);
    }

    return parseRegularCondition(conditionXmlNode, ruleEngineContext);
}

module.exports = function(ruleXml, ruleEngineContext){
   
    ruleXml = ruleXml.replace('\t','').replace('\n','').replace('\r','');

    xmlDoc = xmlParser.xml2js(ruleXml,  {compact: false, spaces: 4});

    var rulesetNode = xmlDoc.elements.find(x => x.type == "element" && x.name == "ruleset");    

    if(!rulesetNode || 
        rulesetNode.type != "element" || 
        rulesetNode.name != "ruleset")
    {
        throw new Error("Ruleset node is missing.");
    }

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
            conditions: [],
            actions: []
        };

        var attributeKeys = Object.keys(ruleXmlNode.attributes);

        attributeKeys.forEach(attr => {
            rule[attr] = ruleXmlNode.attributes[attr];
        });

        var conditionsRootNode = ruleXmlNode.elements.find(x => x.type == "element" && x.name == "conditions");

        conditionsRootNode.elements.filter(x => x.type == "element").forEach(conditionXmlNode => {
            var parsedCondition = parseCondition(conditionXmlNode, ruleEngineContext);
            if(parsedCondition)
            {
                rule.conditions.push(parsedCondition);
            }else {
                throw new Error('Condition wasnt parsed', conditionXmlNode);
            }
        });

        var actionsRootNode = ruleXmlNode.elements.find(x => x.type == "element" && x.name == "actions");
        
        actionsRootNode.elements.filter(x => x.type == "element").forEach(actionXmlNode => {
            var parsedAction = parseAction(actionXmlNode, ruleEngineContext);
            if(parsedAction)
            {
                rule.actions.push(parsedAction);
            }else {
                throw new Error('Condition wasnt parsed', actionXmlNode);
            }
        });

        parsedRule.rules.push(rule);        
    });

    return parsedRule;
}