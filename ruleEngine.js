var rulesFactory = require('./rules/initializeRules')
var commandFactory = require('./commands/initializeCommands')
var operatorFactory = require('./operators/initializeOperators')

var ruleParser = require('./ruleParser')
var ruleEngineRunner = require('./ruleEngineRunner')

const ItemProvider = require("./itemProvider").ItemProvider;

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

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

    parseRuleXml(ruleXml, ruleEngineContext) {
        var parsedRule = ruleParser(ruleXml, ruleEngineContext);
        return parsedRule;
    }

    getRuleEngineContext(itemParameter){
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
            prefetchResponse: null        
        };
    }

    runRule(parsedRule, getRuleEngineContext){
        var result = ruleEngineRunner(parsedRule, getRuleEngineContext);
        return result;
    }

    prefetchItems(ruleEngineContext){

        ruleEngineContext.prefetchKeys = uniq(ruleEngineContext.prefetchKeys);

        console.log('Items for retrieve for prefetch cache:');
        console.log(ruleEngineContext.prefetchKeys);

        //TODO: Retrieve items for the rule here
    }
}

exports.JssRuleEngine = JssRuleEngine;

exports.runRule = function(contextItem, ruleXml) {
    var ruleEngine = exports.createRuleEngine();
    var ruleEngineContext = ruleEngine.getRuleEngineContext(contextItem);    
    var parsedRule = ruleEngine.parseRuleXml(ruleXml, ruleEngineContext);
    ruleEngine.prefetchItems(ruleEngineContext);
    var ruleResult = ruleEngine.runRule(parsedRule, ruleEngineContext);
    return ruleResult;
}

