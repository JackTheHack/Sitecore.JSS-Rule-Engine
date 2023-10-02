import PersonalizedPlaceholder  from "./components/PersonalizedPlaceholder";
//@ts-ignore
import { registerNextJS } from "./rule-engine/ruleEngineProvider";
//@ts-ignore
import {getRuleEngineInstance} from 'sitecore-jss-rule-engine'

//register commands for global instance
var ruleEngine = getRuleEngineInstance();
registerNextJS(ruleEngine);

//module index.js
export {PersonalizedPlaceholder}
export { PersonalizationHelper } from "./lib";
export { registerNextJS } from './rule-engine/ruleEngineProvider'
export { RulesSSRPersonalizationPlugin } from "./plugins/page-props-factory/rulesSSRPersonalizationPlugin";
export { RulesSSGPersonalizationPlugin } from "./plugins/page-props-factory/rulesSSGPersonalizationPlugin";
export { ResolvePersonalizationPathPlugin } from "./plugins/page-props-factory/resolvePersonalizationPathPlugin";

