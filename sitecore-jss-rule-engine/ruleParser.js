//var xmlParser =  require('xml-js');
const { parseXml } = require('@rgrove/parse-xml');

function parseUnionCondition(conditionXmlNode, ruleEngineContext) {
    var parsedCondition = {
        conditions: [],
        className: conditionXmlNode.name
    }

    var childNodes = conditionXmlNode.children.filter(x => x.type == "element" && x.name == "condition");

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

    var attributeKeys = Object.keys(actionXmlNode?.attributes);

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
   
    if(!ruleXml || ruleXml.length == 0)
    {
        return null;
    }

    ruleXml = ruleXml.replace('\t','').replace('\n','').replace('\r','');

    xmlDoc = parseXml(ruleXml);    

    var rulesetNode = xmlDoc.children.find(x => x.type == "element" && x.name == "ruleset");    

    if(!rulesetNode || 
        !rulesetNode.children ||
        rulesetNode.type != "element" || 
        rulesetNode.name != "ruleset")
    {
        throw new Error("Ruleset node is missing.");
    }

    var parsedRule = {
        rules: []
    };

    var rulesNodes = rulesetNode.children.filter(x => x.type == "element" && x.name == "rule");

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

        var conditionsRootNode = ruleXmlNode.children.find(x => x.type == "element" && x.name == "conditions");

        if(conditionsRootNode && conditionsRootNode.children)
        {
            ruleEngineContext.ruleEngine.debugMessage(conditionsRootNode);            

            conditionsRootNode.children.filter(x => x.type == "element").forEach(conditionXmlNode => {
                var parsedCondition = parseCondition(conditionXmlNode, ruleEngineContext);
                if(parsedCondition)
                {
                    ruleEngineContext.ruleEngine.debugMessage('Parsed condition element:');
                    ruleEngineContext.ruleEngine.debugMessage(parsedCondition);
                    rule.conditions.push(parsedCondition);
                }else {
                    throw new Error('Condition wasnt parsed', conditionXmlNode);
                }
            });
        }

        var actionsRootNode = ruleXmlNode.children.find(x => x.type == "element" && x.name == "actions");
        
        if(actionsRootNode && actionsRootNode.children)
        {
            ruleEngineContext.ruleEngine.debugMessage(actionsRootNode);            

            actionsRootNode.children.filter(x => x.type == "element").forEach(actionXmlNode => {
                var parsedAction = parseAction(actionXmlNode, ruleEngineContext);
                if(parsedAction)
                {
                    ruleEngineContext.ruleEngine.debugMessage('Parsed action element:');
                    ruleEngineContext.ruleEngine.debugMessage(parsedAction);
                    rule.actions.push(parsedAction);
                }else {
                    throw new Error('Condition wasnt parsed', actionXmlNode);
                }
            });
        }

        parsedRule.rules.push(rule);        
    });

    return parsedRule;
}