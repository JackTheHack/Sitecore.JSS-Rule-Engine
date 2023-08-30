"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesPersonalizationPlugin = exports.registerNextJS = exports.PersonalizationHelper = exports.ClientSidePlaceholder = void 0;
var PersonalizedPlaceholder_1 = __importDefault(require("./components/PersonalizedPlaceholder"));
exports.ClientSidePlaceholder = PersonalizedPlaceholder_1.default;
//@ts-ignore
var ruleEngineProvider_1 = require("./rule-engine/ruleEngineProvider");
//@ts-ignore
var sitecore_jss_rule_engine_1 = require("sitecore-jss-rule-engine");
//register commands for global instance
var ruleEngine = (0, sitecore_jss_rule_engine_1.getRuleEngineInstance)();
(0, ruleEngineProvider_1.registerNextJS)(ruleEngine);
var lib_1 = require("./lib");
Object.defineProperty(exports, "PersonalizationHelper", { enumerable: true, get: function () { return lib_1.PersonalizationHelper; } });
var ruleEngineProvider_2 = require("./rule-engine/ruleEngineProvider");
Object.defineProperty(exports, "registerNextJS", { enumerable: true, get: function () { return ruleEngineProvider_2.registerNextJS; } });
var rulesPersonalization_1 = require("./plugins/page-props-factory/rulesPersonalization");
Object.defineProperty(exports, "RulesPersonalizationPlugin", { enumerable: true, get: function () { return rulesPersonalization_1.RulesPersonalizationPlugin; } });
