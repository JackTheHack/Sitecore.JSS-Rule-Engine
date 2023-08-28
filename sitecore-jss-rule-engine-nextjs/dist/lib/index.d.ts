export declare class PersonalizationHelper {
    config: any;
    constructor(config: any);
    guid(): string;
    getItemById(itemId: String, externalEdgeEndpoint: Boolean): Promise<unknown>;
    populateFields(rendering: any, externalEdgeEndpoint: Boolean): Promise<any>;
    doPersonalizePlaceholder(placeholderPersonalization: any, elementPlaceholderRenderings: any, externalEdgeEndpoint: Boolean): Promise<any>;
    personalize(props: any, personalizationRule: any): Promise<any>;
}
