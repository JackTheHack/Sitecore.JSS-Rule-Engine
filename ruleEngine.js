var rulesFactory = require('./rules/initializeRules')
var commandFactory = require('./commands/initializeCommands')
var operatorFactory = require('./operators/initializeOperators')

var ruleParser = require('./ruleParser')
var ruleEngineRunner = require('./ruleEngineRunner')

class JssRuleEngine {
    constructor() {
        this.commandDefinitions = [];
        this.ruleDefinitions = [];
        this.operatorDefinitions = [];

        this.initialize();
    }

    initialize() {
        rulesFactory(this);
        commandFactory(this);
        operatorFactory(this);
    }

    registerCommand(id, command) {
        this.commandDefinitions[id] = command;
    }

    registerRule(id, rule) {
        this.ruleDefinitions[id] = rule;
    }

    registerOperator(id, operator) {
        this.operatorDefinitions[id] = operator;
    }

    parseRuleXml(ruleXml) {
        var parsedRule = ruleParser(ruleXml);
        return parsedRule;
    }

    getRuleEngineContext(itemParameter){
        return {
            sitecoreInstance: {},
            location: typeof(window) !== "undefined" && window ? window.location : null,
            cookies: typeof(document) !== "undefined" && document ? document.cookies : null,
            contextItem: itemParameter,
            env: process.env,
            ruleEngine: this        
        };
    }

    runRule(parsedRule, getRuleEngineContext){
        var result = ruleEngineRunner(parsedRule, getRuleEngineContext);
        return result;
    }
}

exports.createRuleEngine = function() {
    var result = new JssRuleEngine();
    return result;
}

exports.runRule = function(contextItem, ruleXml) {
    var ruleEngine = exports.createRuleEngine();
    var ruleEngineContext = ruleEngine.getRuleEngineContext(contextItem);    
    var parsedRule = ruleEngine.parseRuleXml(ruleXml);
    var ruleResult = ruleEngine.runRule(parsedRule, ruleEngineContext);
    return ruleResult;
}

