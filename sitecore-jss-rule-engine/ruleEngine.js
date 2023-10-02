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

        this.setOptions(options);

        this.initialize(options);
    }

    setOptions(options) {
        if(options)
        {
            this.debug = options.debug ? options.debug : false;
            this.sitecoreContext = options.sitecoreContext;
            this.requestContext = options.requestContext;
            this.itemProvider = options.itemProvider;
            this.mockDate = options.mockDate;
        }

        if(typeof(window) !== "undefined" && window && !this.requestContext)
        {
            if(!this.requestContext)            
            {
                this.requestContext = {
                    url: window.location.href                    
                };
            }            
        }    
        
        this.setRequestContext(this.requestContext)
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

        if(this.requestContext && 
           this.requestContext.url)            
        {            
            var queryString = this.requestContext.url.indexOf('?')>=0 ? this.requestContext.url.split('?')[1] : '';
            this.requestContext.queryString = queryString;
            const urlParams = new URLSearchParams(this.requestContext.queryString);
            this.requestContext.urlParams = urlParams;
        }
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

    runRuleActions(parsedRule, ruleActions, ruleEngineContext) {

        console.log('#### runRuleActions');

        if(!parsedRule?.rules || parsedRule.rules.length != ruleActions.length)
        {
            console.warn("Parsed rules and provided rule actions array lengths doesn't match");
            console.log('$$$$$', parsedRule, ruleActions);
            console.log('#######')
            return;
        }

        if(parsedRule.rules.length == 0)
        {
            console.log('Empty rules array');
        }

        console.log('Executing the rule actions', ruleActions);
        
        var rules = parsedRule.rules;        

        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];

            console.log('Rule to execute for ', rule);

            if(ruleActions[i] && rule.actions)
            {
                console.log('Actions to execute', rule.actions)
                rule.actions.forEach(ruleAction => {
                    var actionFunction = ruleEngineContext.ruleEngine.commandDefinitions[ruleAction.id];
    
                    if (typeof(actionFunction) === "undefined" || !ruleAction) {
                        throw new Error('Rule definitions missing for id ' + ruleAction.id);
                    }
                    
                    console.log('Executing rule action', ruleAction);
                    console.log(actionFunction);
    
                    actionFunction(ruleAction, ruleEngineContext);
                })   
            }
            
        }
        
        console.log('#### runRuleActions end');
    }

    prefetchItems(ruleEngineContext){

        ruleEngineContext.prefetchKeys = uniq(ruleEngineContext.prefetchKeys);

        //TODO: Retrieve items for the rule here
    }

    parseAndRunRule(ruleXml, ruleEngineContext){
        var ruleEngineContext = ruleEngineContext ? ruleEngineContext : this.getRuleEngineContext();        
        let parsedRule = this.parseRuleXml(ruleXml, ruleEngineContext);
        this.prefetchItems(ruleEngineContext);
        var ruleResult = this.runRule(parsedRule, ruleEngineContext);        
        return ruleResult;
    }

    debugMessage()
    {
        if(this.debug && typeof(console) !== 'undefined')
        {            
            console.log.apply(console, arguments);
        }
    }
}

exports.JssRuleEngine = JssRuleEngine;

