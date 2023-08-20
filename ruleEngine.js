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

        if(options)
        {
            this.debug = options.debug ? options.debug : false;
            this.sitecoreContext = options.sitecoreContext;
            this.requestContext = options.requestContext;
            this.itemProvider = options.itemProvider;
            this.mockDate = options.mockDate;
        }

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

    setSitecoreContext(sitecoreContext)
    {
        this.sitecoreContext = sitecoreContext;
    }

    setRequestContext(requestContext)
    {
        this.requestContext = requestContext;
    }

    setItemProvider(itemProvider)
    {
        this.itemProvider = itemProvider;
    }

    setMockDate(dateObj)
    {
        this.mockDate = dateObj;
    }

    getRuleEngineContext(){

        var dateObj = this.mockDate ? this.mockDate : {
            now: new Date()            
        };

        return {            
            location: typeof(window) !== "undefined" && window ? window.location : null,
            cookies: typeof(document) !== "undefined" && document ? document.cookies : null,
            sitecoreContext: this.sitecoreContext,
            requestContext: this.requestContext,
            dateTime: dateObj,
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
            itemProvider: this.itemProvider    
        };
    }

    runRule(parsedRule, ruleEngineContext){
        var result = ruleEngineRunner(parsedRule, ruleEngineContext);
        return result;
    }

    prefetchItems(ruleEngineContext){

        ruleEngineContext.prefetchKeys = uniq(ruleEngineContext.prefetchKeys);

        //TODO: Retrieve items for the rule here
    }

    parseAndRunRule(ruleXml, ruleEngineContext){
        var ruleEngineContext = ruleEngineContext ? ruleEngineContext : this.getRuleEngineContext();
        var parsedRule = this.parseRuleXml(ruleXml, ruleEngineContext);
        this.prefetchItems(ruleEngineContext);
        var ruleResult = this.runRule(parsedRule, ruleEngineContext);
        return ruleResult;
    }

    debugMessage(message)
    {
        if(this.debug)
        {
            console.log(message);
        }
    }
}

exports.JssRuleEngine = JssRuleEngine;

