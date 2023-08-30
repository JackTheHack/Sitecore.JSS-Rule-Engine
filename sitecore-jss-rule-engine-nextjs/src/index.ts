import ClientSidePlaceholder  from "./components/PersonalizedPlaceholder";
//@ts-ignore
import { registerNextJS } from "./rule-engine/ruleEngineProvider";
//@ts-ignore
import {getRuleEngineInstance} from 'sitecore-jss-rule-engine'

//register commands for global instance
var ruleEngine = getRuleEngineInstance();
registerNextJS(ruleEngine);

//module index.js
export {ClientSidePlaceholder}
export { PersonalizationHelper } from "./lib";
export { registerNextJS } from './rule-engine/ruleEngineProvider'
export { RulesPersonalizationPlugin } from "./plugins/page-props-factory/rulesPersonalization";

