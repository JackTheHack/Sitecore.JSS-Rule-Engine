import { JssRuleEngine } from '../ruleEngine'

export interface RuleEngineExecutionResult {
    result?: boolean; 
    ruleResults?: Boolean[]; 
    parsedRule?: any; 
}

export interface RuleEngineDateContext {
    now : Date;
}

export interface RuleEngineSitecoreContext {
    item?: any,
    siteName: string,
}

export interface RuleEngineContext {
    //location: Location | undefined | null;
    dateTime?: RuleEngineDateContext;
    skipActions?: boolean;
    ruleExecutionResult?: RuleEngineExecutionResult;
    debug?: boolean,
    sitecoreContext?: RuleEngineSitecoreContext,
    requestContext?: RuleEngineRequestContext,
    itemProvider?: any,
    mockDate?: Date,
    ruleEngine?: JssRuleEngine    
}

export interface RuleEngineRequestContext {
    cookies?: Map<string, string>,
    urlParams?: URLSearchParams,
    referral? : string,
    queryString?: string 
    url?: string,
}

export interface ParsedRuleXmlData {
    rules?: RuleData[]
}

export interface RuleData {
    conditions?: RuleConditionData[],
    actions?: RuleActionData[],
    attributes?: Map<string, any>,
}

export interface RuleConditionData {
    //union conditions (and/or)
    conditions?: RuleConditionData[];

    id: string,
    except: boolean;

    className: string,
    attributes: Map<string, any>,
}

export interface RuleActionData {
    id: string,
    className?: string,
    attributes: Map<string, any>,
}