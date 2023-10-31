import rulesFactory from './rules/initializeRules'
import commandFactory from './commands/initializeCommands'
import operatorFactory from './operators/initializeOperators'

import ruleParser from './ruleParser'
import ruleEngineRunner from './ruleEngineRunner'

function uniq(a:any) {
    return a.sort().filter(function(item:any, pos:any, ary:any) {
        return !pos || item != ary[pos - 1];
    });
}

export class JssRuleEngine {
    commandDefinitions: any[]
    ruleDefinitions: any[]
    operatorDefinitions: any[]
    debug: any
    sitecoreContext: any
    requestContext: any
    itemProvider: any
    mockDate: any

    constructor(options:any = null) {
        this.commandDefinitions = [];
        this.ruleDefinitions = [];
        this.operatorDefinitions = [];

        this.setOptions(options);
        this.initialize(options);
    }

    setOptions(options:any) {
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

    initialize(_options:any) {
        rulesFactory(this);
        commandFactory(this);
        operatorFactory(this);
    }

    registerCommand(id:any, command:any) {
        this.commandDefinitions[id] = command;
    }

    registerRule(id:any, rule:any) {
        this.ruleDefinitions[id] = rule;
    }

    registerOperator(id:any, operator:any) {
        this.operatorDefinitions[id] = operator;
    }

    parseRuleXml(ruleXml:any, ruleEngineContext:any) {
        var parsedRule = ruleParser(ruleXml, ruleEngineContext);        
        return parsedRule;
    }

    setSitecoreContext(sitecoreContext:any)
    {
        this.sitecoreContext = sitecoreContext;
    }

    setRequestContext(requestContext:any)
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

    setItemProvider(itemProvider:any)
    {
        this.itemProvider = itemProvider;
    }

    setMockDate(dateObj:any)
    {
        this.mockDate = dateObj;
    }

    getRuleEngineContext(){

        var dateObj = this.mockDate ? this.mockDate : {
            now: new Date()            
        };

        return {            
            location: typeof(window) !== "undefined" && window ? window.location : null,
            cookies: typeof(document) !== "undefined" && document ? document.cookie : null,
            sitecoreContext: this.sitecoreContext,
            requestContext: this.requestContext,
            dateTime: dateObj,
            env: process.env,
            ruleEngine: this as JssRuleEngine,
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

    runRule(parsedRule:any, ruleEngineContext:any){        
        var result = ruleEngineRunner(parsedRule, ruleEngineContext);
        return result;
    }

    runRuleActions(parsedRule:any, ruleActions:any, ruleEngineContext:any) {

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
                rule.actions.forEach((ruleAction:any) => {
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

    prefetchItems(ruleEngineContext:any){

        ruleEngineContext.prefetchKeys = uniq(ruleEngineContext.prefetchKeys);

        //TODO: Retrieve items for the rule here
    }

    parseAndRunRule(ruleXml:any, ruleEngineContext:any = null){
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

