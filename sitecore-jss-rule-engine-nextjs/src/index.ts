import PersonalizedPlaceholder  from "./components/PersonalizedPlaceholder";
import { registerNextJS } from "./rule-engine/ruleEngineProvider";
import { getRuleEngineInstance } from 'sitecore-jss-rule-engine'

//register commands for global instance
let ruleEngine = getRuleEngineInstance();
registerNextJS(ruleEngine);

//module index.js
export {PersonalizedPlaceholder}
export { PersonalizationHelper } from "./lib";
export { registerNextJS } from './rule-engine/ruleEngineProvider'
export { RulesSSRPersonalizationPlugin } from "./plugins/page-props-factory/rulesSSRPersonalizationPlugin";
export { RulesSSGPersonalizationPlugin } from "./plugins/page-props-factory/rulesSSGPersonalizationPlugin";
export { ResolvePersonalizationPathPlugin } from "./plugins/page-props-factory/resolvePersonalizationPathPlugin";
export { ScPersonalizePlugin, scpersonalizePlugin } from './plugins/extractPath/scpersonalize'
export { GraphQLPersonalizeServiceConfig, GraphQLSCPersonalizeService, PersonalizeInfo, PersonalizeContext } from './plugins/middleware/ScPersonalizeService'
export { ScPersonalizeMiddleware, ScPersonalizeMiddlewareConfig } from './plugins/middleware/ScPersonalizedMiddleware'
export { BaseGraphQLSitemapServiceConfig, BasePersonalizeGraphQLSitemapService } from './plugins/sitemapFetcher/base-personalize-graphql-sitemap-service'
export { MultisiteGraphQLSitemapServiceConfig, MultisitePersonalizeGraphQLSitemapService } from './plugins/sitemapFetcher/multisite-personalize-sitemap-fetcher'

