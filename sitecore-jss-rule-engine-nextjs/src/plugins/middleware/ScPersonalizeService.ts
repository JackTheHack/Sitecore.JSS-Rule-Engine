import { GraphQLClient, GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';
import { debug } from '@sitecore-jss/sitecore-jss';
import { isTimeoutError } from '@sitecore-jss/sitecore-jss/utils';
import { CacheClient, CacheOptions, MemoryCacheClient } from './cache-client';
//@ts-ignore
import { JssRuleEngine } from 'sitecore-jss-rule-engine';
import { registerNextJS } from '../../rule-engine/ruleEngineProvider';
import { getScPersonalizedVariantIds } from '../../lib/personalizationUtils';

export type GraphQLPersonalizeServiceConfig = CacheOptions & {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Timeout (ms) for the Personalize request. Default is 400.
   */
  timeout?: number;
  /**
   * Optional Sitecore Personalize scope identifier allowing you to isolate your personalization data between XM Cloud environments
   */
  scope?: string;
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * Object model of personlize info
 */
export type PersonalizeInfo = {
  /**
   * The (CDP-friendly) content id
   */
  contentId: string;
  /**
   * The configured variant ids
   */
  variantIds: string[];
  activeVariantid: string;
};

export type PersonalizeContext = {
  url: string;
  hostname: string | null;
}

type PersonalizeQueryResult = {
  layout: { item: { id: string; version: string; personalizationRule: { value: string }, personalizeOnEdge: { value: string } } };
};

export class GraphQLSCPersonalizeService {
  private graphQLClient: GraphQLClient;
  private cache: CacheClient<PersonalizeQueryResult>;
  private personalizeContext?: PersonalizeContext;
  protected get query(): string {
    return /* GraphQL */ `
      query($siteName: String!, $language: String!, $itemPath: String!) {
        layout(site: $siteName, routePath: $itemPath, language: $language) {
          item {
            id
            version
            personalizationRule:field(name:"PersonalizationRules"){
              value
            },
            personalizeOnEdge:field(name:"PersonalizeOnEdge"){
              value
            }
          }
        }
      }
    `;
  }
  /**
   * Fetch personalize data using the Sitecore GraphQL endpoint.
   * @param {GraphQLPersonalizeServiceConfig} config
   */
  constructor(protected config: GraphQLPersonalizeServiceConfig) {
    this.config.timeout = config.timeout || 400;
    this.graphQLClient = this.getGraphQLClient();
    this.cache = this.getCacheClient();
  }

  setPersonalizeContext(context: PersonalizeContext) {
    this.personalizeContext = context;
  }

  /**
   * Get personalize information for a route
   * @param {string} itemPath page route
   * @param {string} language language
   * @param {string} siteName site name
   * @returns {Promise<PersonalizeInfo | undefined>} the personalize information or undefined (if itemPath / language not found)
   */
  async getPersonalizeInfo(
    itemPath: string,
    language: string,
    siteName: string
  ): Promise<PersonalizeInfo | undefined> {

    debug.personalize('fetching personalize info for %s %s %s', siteName, itemPath, language);
    console.log('fetching personalize info for %s %s %s', siteName, itemPath, language);

    const cacheKey = this.getCacheKey(itemPath, language, siteName);
    let data = this.cache.getCacheValue(cacheKey);

    if (!data) {
      try {
        //console.log('personalize info cache is empty - making graphQL call.', this.query);
        data = await this.graphQLClient.request<PersonalizeQueryResult>(this.query, {
          siteName,
          itemPath,
          language,
        });
        this.cache.setCacheValue(cacheKey, data);
      } catch (error) {
        if (isTimeoutError(error)) {
          return undefined;
        }

        throw error;
      }
    } else {
      //console.log('Found personalize info in the cache - ', data);
    }

    let variantIds: any = null;
    let activeVariantid: any = null;

    const personalizeOnEdge = data.layout?.item?.personalizeOnEdge?.value;

    if (personalizeOnEdge == "1") {
      console.log("Personalizing on edge", personalizeOnEdge)

      const ruleEngineInstance: any = new JssRuleEngine();

      if (ruleEngineInstance) {
        console.log('Registering NextJS commands for rule engine')
        registerNextJS(ruleEngineInstance);

        const ruleXml = data.layout?.item?.personalizationRule?.value;

        //console.log("Rule xml", ruleXml, ruleXml.replace)

        if (this.personalizeContext) {
          console.log('Current url - ', this.personalizeContext.url);
          ruleEngineInstance.setRequestContext({
            url: this.personalizeContext.url
          });
        }

        const ruleEngineContext = ruleEngineInstance.getRuleEngineContext();

        console.log('Parsing rule');

        ruleEngineInstance.parseAndRunRule(ruleXml, ruleEngineContext);

        if (ruleEngineContext.ruleExecutionResult &&
          ruleEngineContext.ruleExecutionResult.parsedRule) {
          console.log('Rule parsed - getting variant ids');
          activeVariantid = this.getActiveVariantId(ruleEngineContext.ruleExecutionResult);
          console.log('Active variant id - ', activeVariantid)
          variantIds = getScPersonalizedVariantIds(ruleEngineContext.ruleExecutionResult.parsedRule);
          console.log('Variant ids - ', variantIds)
        }
      }
    } else {
      console.log('Edge personalization is disabled for this item in Sitecore.')
    }

    const result: PersonalizeInfo = {
      contentId: itemPath,
      variantIds: variantIds,
      activeVariantid: activeVariantid
    }

    console.log('=====')

    return result;
  }

  protected getActiveVariantId(ruleExecutionResults: any): any {

    if (!ruleExecutionResults?.ruleResults) {
      return null;
    }

    const ruleResults = ruleExecutionResults.ruleResults;

    let result = "";
    let isAnyRuleTrue = false;
    if (ruleResults && ruleResults.forEach) {
      ruleResults.forEach((ruleRes: any) => {
        result += ruleRes ? "1" : "0";
        if(ruleRes) isAnyRuleTrue = true;
      });
    }

    return isAnyRuleTrue ? result : null;
  }

  /**
   * Gets cache client implementation
   * Override this method if custom cache needs to be used
   * @returns CacheClient instance
   */
  protected getCacheClient(): CacheClient<PersonalizeQueryResult> {
    return new MemoryCacheClient<PersonalizeQueryResult>({
      cacheEnabled: this.config.cacheEnabled ?? true,
      cacheTimeout: this.config.cacheTimeout ?? 10,
    });
  }

  protected getCacheKey(itemPath: string, language: string, siteName: string) {
    return `${siteName}-${itemPath}-${language}`;
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    return new GraphQLRequestClient(this.config.endpoint, {
      apiKey: this.config.apiKey,
      debugger: debug.personalize,
      fetch: this.config.fetch,
      timeout: this.config.timeout,
    });
  }
}