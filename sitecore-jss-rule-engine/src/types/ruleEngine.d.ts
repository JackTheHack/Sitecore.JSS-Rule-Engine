import { IItemProvider } from '../graphQl/itemProvider';
import { JssRuleEngine } from '../ruleEngine'

export interface RuleEngineExecutionResult {
    result?: boolean; 
    ruleResults?: Boolean[]; 
    parsedRule: ParsedRuleXmlData | null | undefined; 
}

export interface RuleEngineDateContext {
    now : Date;
}

export interface RuleEngineSitecoreContext {    
    siteName?: string,
    itemId?: string,
    itemLanguage?: string,
    itemVersion?: number,
    route?: {
        name?: string,
        displayName?: string,
        fields?: any,
    },
    site?: {
        name?: string
    },
    databaseName?: string,
    pageEditing?: boolean,
    pageState?: string,
    language?: string,            
    variantId?: string,
    itemPath?: string,
    templateId?: string,
    itemProvider?: IItemProvider
}

export interface RuleOperatorContext {
    parameter1: any,
    parameter2: any
}

type ConditionFunctionDefinition = {
    (conditionData: RuleConditionData, ruleContext: RuleEngineContext) : Promise<boolean | void>;
}

type OperatorFunctionDefinition = {
    (operatorContext: RuleOperatorContext, ruleContext?: RuleEngineContext) : Promise<boolean | void>;
}

type ActionFunctionDefinition = {
    (actionData: RuleActionData, ruleContext: RuleEngineContext) : Promise< boolean | null | void>;
}

export interface RuleEngineContext {
    //location: Location | undefined | null;
    dateTime?: RuleEngineDateContext;
    skipActions?: boolean;
    ruleExecutionResult?: RuleEngineExecutionResult;
    debug?: boolean,
    sitecoreContext?: RuleEngineSitecoreContext,
    requestContext?: RuleEngineRequestContext,    
    mockDate?: Date,
    ruleEngine?: JssRuleEngine    
}

export interface RuleEngineRequestContext {
    cookies?: Map<string, string>,
    urlParams?: URLSearchParams,
    referral? : string,
    queryString?: string,
    userAgent?: string, 
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