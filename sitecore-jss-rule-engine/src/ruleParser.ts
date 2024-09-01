//var xmlParser =  require('xml-js');
import { parseXml } from '@rgrove/parse-xml';
import { ParsedRuleXmlData, RuleActionData, RuleConditionData, RuleData, RuleEngineContext } from './types/ruleEngine';

function parseUnionCondition(conditionXmlNode: any, ruleEngineContext: RuleEngineContext) {
    var parsedCondition = {
        conditions: new Array<any>(),
        className: conditionXmlNode.name
    } as RuleConditionData;

    var childNodes = conditionXmlNode.children.filter((x: any) => x.type == "element" && x.name == "condition");

    childNodes.forEach((ruleXmlNode: any) => {
        var parsedRule = parseCondition(ruleXmlNode, ruleEngineContext);
        if (parsedRule) {
            parsedCondition.conditions?.push(parsedRule);
        } else {
            throw new Error('Condition wasnt parsed' + ruleXmlNode);
        }
    });

    return parsedCondition;
}

function parseRegularCondition(conditionXmlNode: any, _ruleEngineContext: RuleEngineContext) {
    var parsedCondition = {
        className: "condition",
        attributes: new Map<string, any>()
    } as RuleConditionData;

    var attributeKeys = Object.keys(conditionXmlNode.attributes);

    attributeKeys.forEach((attr:string) => {
        switch(attr)
        {
            case 'id':
                parsedCondition.id = conditionXmlNode.attributes[attr];
            case 'except':
                parsedCondition.except = conditionXmlNode.attributes[attr] == 'true';    
            default:
                parsedCondition.attributes.set(attr, conditionXmlNode.attributes[attr]);            
        }
    });

    return parsedCondition;
}

function parseAction(actionXmlNode: any, _ruleEngineContext: RuleEngineContext) {
    var parsedAction = {
        className: "action",
        attributes: new Map<string, any>()
    } as RuleActionData;

    var attributeKeys = Object.keys(actionXmlNode?.attributes);

    attributeKeys.forEach(attr => {

        if (attr == 'id') {
            parsedAction.id = actionXmlNode.attributes[attr];
        } else {
            parsedAction.attributes.set(attr, actionXmlNode.attributes[attr]);
        }
    });

    return parsedAction;
}

function parseCondition(conditionXmlNode: any, ruleEngineContext: RuleEngineContext) {
    if (conditionXmlNode.name == "or" || conditionXmlNode.name == "and") {
        return parseUnionCondition(conditionXmlNode, ruleEngineContext);
    }

    return parseRegularCondition(conditionXmlNode, ruleEngineContext);
}

export default function (ruleXml: string, ruleEngineContext: RuleEngineContext) : ParsedRuleXmlData | null {

    if (!ruleXml || ruleXml.length == 0) {
        return null;
    }

    ruleXml = ruleXml.replaceAll('\t', '').replaceAll('\n', '').replaceAll('\r', '');

    let xmlDoc: any = parseXml(ruleXml);

    var rulesetNode = xmlDoc.children.find((x: any) => x.type == "element" && x.name == "ruleset");

    if (!rulesetNode ||
        !rulesetNode.children ||
        rulesetNode.type != "element" ||
        rulesetNode.name != "ruleset") {
        throw new Error("Ruleset node is missing.");
    }

    var parsedRule = {
        rules: []
    } as ParsedRuleXmlData;

    var rulesNodes = rulesetNode.children.filter((x: any) => 
        x.type == "element" && x.name == "rule");

    if (!rulesNodes) {
        console.log('Rule nodes are missing.');
        return null;
    }

    rulesNodes.forEach((ruleXmlNode: any) => {

        var rule = {
            conditions: [],
            actions: [],
            attributes: new Map<string, any>()
        } as RuleData;

        var attributeKeys = Object.keys(ruleXmlNode.attributes);

        attributeKeys.forEach((attr: string) => {
            rule.attributes?.set(attr, ruleXmlNode.attributes[attr])
        });

        var conditionsRootNode = ruleXmlNode.children.find((x: any) => x.type == "element" && x.name == "conditions");

        if (conditionsRootNode && conditionsRootNode.children) {

            ruleEngineContext.ruleEngine?.debugMessage(conditionsRootNode);

            conditionsRootNode.children.filter((x: any) => x.type == "element").forEach((conditionXmlNode: any) => {
                
                var parsedCondition = parseCondition(conditionXmlNode, ruleEngineContext);
                if (parsedCondition) {
                    ruleEngineContext.ruleEngine?.debugMessage('Parsed condition element:');
                    ruleEngineContext.ruleEngine?.debugMessage(parsedCondition);
                    rule.conditions?.push(parsedCondition);
                } else {
                    throw new Error('Condition wasnt parsed ' + conditionXmlNode);
                }
            });
        }

        var actionsRootNode = ruleXmlNode.children.find((x: any) => x.type == "element" && x.name == "actions");

        if (actionsRootNode && actionsRootNode.children) {
            ruleEngineContext.ruleEngine?.debugMessage(actionsRootNode);

            actionsRootNode.children.filter((x: any) => x.type == "element").forEach((actionXmlNode: any) => {
                var parsedAction = parseAction(actionXmlNode, ruleEngineContext);
                if (parsedAction) {
                    ruleEngineContext.ruleEngine?.debugMessage('Parsed action element:');
                    ruleEngineContext.ruleEngine?.debugMessage(parsedAction);
                    rule.actions?.push(parsedAction);
                } else {
                    throw new Error('Condition wasnt parsed ' + actionXmlNode);
                }
            });
        }

        parsedRule.rules?.push(rule);
    });

    return parsedRule;
}