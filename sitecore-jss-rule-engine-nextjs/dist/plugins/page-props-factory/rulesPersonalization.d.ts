import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { JssRuleEngine } from 'sitecore-jss-rule-engine';
import { DictionaryPhrases, ComponentPropsCollection, LayoutServiceData, SiteInfo, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
export type SitecorePageProps = {
    site: SiteInfo;
    locale: string;
    dictionary: DictionaryPhrases;
    componentProps: ComponentPropsCollection;
    notFound: boolean;
    layoutData: LayoutServiceData;
    headLinks: HTMLLink[];
};
interface Plugin {
    /**
     * Detect order when the plugin should be called, e.g. 0 - will be called first (can be a plugin which data is required for other plugins)
     */
    order: number;
    /**
     * A function which will be called during page props generation
     */
    exec(props: SitecorePageProps, context: GetServerSidePropsContext | GetStaticPropsContext): Promise<SitecorePageProps>;
}
export declare class RulesPersonalizationPlugin implements Plugin {
    graphQLEndpoint: string;
    sitecoreApiKey: string;
    ruleEngine: JssRuleEngine;
    constructor(endpointUrl: string, sitecoreApiKey: string, ruleEngine: JssRuleEngine);
    order: number;
    isDisconnectedMode(props: any): boolean;
    isPageEditing(props: any): any;
    exec(props: any, context: GetServerSidePropsContext | GetStaticPropsContext): Promise<any>;
}
export {};
