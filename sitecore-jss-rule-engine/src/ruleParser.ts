//var xmlParser =  require('xml-js');
import { parseXml } from '@rgrove/parse-xml';

function parseUnionCondition(conditionXmlNode:any, ruleEngineContext:any) {
    var parsedCondition = {
        conditions: new Array<any>(),
        className: conditionXmlNode.name
    }

    var childNodes = conditionXmlNode.children.filter((x:any) => x.type == "element" && x.name == "condition");

    childNodes.forEach((ruleXmlNode:any) => {
        var parsedRule = parseCondition(ruleXmlNode, ruleEngineContext);
        if(parsedRule)
        {
            parsedCondition.conditions.push(parsedRule);
        }else
        {
            throw new Error('Condition wasnt parsed' + ruleXmlNode);
        }        
    });

    return parsedCondition;
}

function parseRegularCondition(conditionXmlNode:any, _ruleEngineContext:any) {
    var parsedCondition = {        
        className: "condition"
    } as any;   

    var attributeKeys = Object.keys(conditionXmlNode.attributes);

    attributeKeys.forEach(attr => {
        parsedCondition[attr] = conditionXmlNode.attributes[attr];
    });

    return parsedCondition;
}

function parseAction(actionXmlNode:any, _ruleEngineContext:any) {
    var parsedAction = {        
        className: "action"
    } as any;

    var attributeKeys = Object.keys(actionXmlNode?.attributes);

    attributeKeys.forEach(attr => {
        parsedAction[attr] = actionXmlNode.attributes[attr];
    });

    return parsedAction;
}

function parseCondition(conditionXmlNode:any, ruleEngineContext:any) {
    if(conditionXmlNode.name == "or" || conditionXmlNode.name == "and")
    {
        return parseUnionCondition(conditionXmlNode, ruleEngineContext);
    }

    return parseRegularCondition(conditionXmlNode, ruleEngineContext);
}

export default function(ruleXml:any, ruleEngineContext:any){
   
    if(!ruleXml || ruleXml.length == 0)
    {
        return null;
    }

    ruleXml = ruleXml.replace('\t','').replace('\n','').replace('\r','');

    let xmlDoc:any = parseXml(ruleXml);    

    var rulesetNode = xmlDoc.children.find((x:any) => x.type == "element" && x.name == "ruleset");    

    if(!rulesetNode || 
        !rulesetNode.children ||
        rulesetNode.type != "element" || 
        rulesetNode.name != "ruleset")
    {
        throw new Error("Ruleset node is missing.");
    }

    var parsedRule = {
        rules: []
    } as any;

    var rulesNodes = rulesetNode.children.filter((x:any) => x.type == "element" && x.name == "rule");

    if(!rulesNodes)
    {
        console.log('Rule nodes are missing.');
        return false;
    }

    rulesNodes.forEach((ruleXmlNode:any) => {

        var rule = {
            conditions: [],
            actions: []
        } as any;

        var attributeKeys = Object.keys(ruleXmlNode.attributes);

        attributeKeys.forEach(attr => {
            rule[attr] = ruleXmlNode.attributes[attr];
        });

        var conditionsRootNode = ruleXmlNode.children.find((x:any) => x.type == "element" && x.name == "conditions");

        if(conditionsRootNode && conditionsRootNode.children)
        {
            ruleEngineContext.ruleEngine.debugMessage(conditionsRootNode);            

            conditionsRootNode.children.filter((x:any) => x.type == "element").forEach((conditionXmlNode:any) => {
                var parsedCondition = parseCondition(conditionXmlNode, ruleEngineContext);
                if(parsedCondition)
                {
                    ruleEngineContext.ruleEngine.debugMessage('Parsed condition element:');
                    ruleEngineContext.ruleEngine.debugMessage(parsedCondition);
                    rule.conditions.push(parsedCondition);
                }else {
                    throw new Error('Condition wasnt parsed ' + conditionXmlNode);
                }
            });
        }

        var actionsRootNode = ruleXmlNode.children.find((x:any) => x.type == "element" && x.name == "actions");
        
        if(actionsRootNode && actionsRootNode.children)
        {
            ruleEngineContext.ruleEngine.debugMessage(actionsRootNode);            

            actionsRootNode.children.filter((x:any) => x.type == "element").forEach((actionXmlNode:any) => {
                var parsedAction = parseAction(actionXmlNode, ruleEngineContext);
                if(parsedAction)
                {
                    ruleEngineContext.ruleEngine.debugMessage('Parsed action element:');
                    ruleEngineContext.ruleEngine.debugMessage(parsedAction);
                    rule.actions.push(parsedAction);
                }else {
                    throw new Error('Condition wasnt parsed ' + actionXmlNode);
                }
            });
        }

        parsedRule.rules.push(rule);        
    });

    return parsedRule;
}