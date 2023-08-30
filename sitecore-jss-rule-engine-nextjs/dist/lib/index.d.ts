import { JssRuleEngine } from 'sitecore-jss-rule-engine';
export declare class PersonalizationHelper {
    endpointUrl: string;
    constructor(graphQlEndpoint: string);
    guid(): string;
    getItemById(itemId: String): Promise<unknown>;
    populateFields(rendering: any): Promise<any>;
    doPersonalizePlaceholder(placeholderPersonalization: any, elementPlaceholderRenderings: any): Promise<any>;
    personalize(ruleEngine: JssRuleEngine, props: any, personalizationRule: any): Promise<any>;
}
