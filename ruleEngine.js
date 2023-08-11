var rulesFactory = require('./rules/initializeRules')
var commandFactory = require('./commands/initializeCommands')
var operatorFactory = require('./operators/initializeOperators')

var ruleParser = require('./ruleParser')
var ruleEngineRunner = require('./ruleEngineRunner')

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

class JssRuleEngine {
    constructor(options) {
        this.commandDefinitions = [];
        this.ruleDefinitions = [];
        this.operatorDefinitions = [];

        this.initialize(options);
    }

    initialize(options) {
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

    parseRuleXml(ruleXml, ruleEngineContext) {
        var parsedRule = ruleParser(ruleXml, ruleEngineContext);
        return parsedRule;
    }

    getRuleEngineContext(itemParameter, itemProvider){
        return {
            sitecoreInstance: {},
            location: typeof(window) !== "undefined" && window ? window.location : null,
            cookies: typeof(document) !== "undefined" && document ? document.cookies : null,
            contextItem: itemParameter,
            env: process.env,
            ruleEngine: this,
            //Items retrieved by prefetch query 
            cachedItems: [],
            //Item keys to retrieve for prefetch
            prefetchKeys: [],
            //GraphQL query to prefetch data 
            prefetchGraphQuery: null,
            //GraphQL response
            prefetchResponse: null,     
            //GraphQL item providre
            itemProvider: itemProvider    
        };
    }

    runRule(parsedRule, getRuleEngineContext){
        var result = ruleEngineRunner(parsedRule, getRuleEngineContext);
        return result;
    }

    prefetchItems(ruleEngineContext){

        ruleEngineContext.prefetchKeys = uniq(ruleEngineContext.prefetchKeys);

        //TODO: Retrieve items for the rule here
    }

    parseAndRunRule(ruleXml, ruleEngineContext){
        var parsedRule = this.parseRuleXml(ruleXml, ruleEngineContext);
        this.prefetchItems(ruleEngineContext);
        var ruleResult = this.runRule(parsedRule, ruleEngineContext);
        return ruleResult;
    }
}

exports.JssRuleEngine = JssRuleEngine;

exports.runRule = function(contextItem, ruleXml, itemProvider) {
    var ruleEngineOptions = {

    };
    var ruleEngine = new JssRuleEngine(ruleEngineOptions);
    var ruleEngineContext = ruleEngine.getRuleEngineContext(contextItem, itemProvider);    
    var ruleResult = ruleEngine.parseAndRunRule(ruleXml, ruleEngineContext);
    return ruleResult;
}

