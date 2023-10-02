"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolvePersonalizationPathPlugin = exports.RulesSSGPersonalizationPlugin = exports.RulesSSRPersonalizationPlugin = exports.registerNextJS = exports.PersonalizationHelper = exports.PersonalizedPlaceholder = void 0;
var PersonalizedPlaceholder_1 = __importDefault(require("./components/PersonalizedPlaceholder"));
exports.PersonalizedPlaceholder = PersonalizedPlaceholder_1.default;
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
var rulesSSRPersonalizationPlugin_1 = require("./plugins/page-props-factory/rulesSSRPersonalizationPlugin");
Object.defineProperty(exports, "RulesSSRPersonalizationPlugin", { enumerable: true, get: function () { return rulesSSRPersonalizationPlugin_1.RulesSSRPersonalizationPlugin; } });
var rulesSSGPersonalizationPlugin_1 = require("./plugins/page-props-factory/rulesSSGPersonalizationPlugin");
Object.defineProperty(exports, "RulesSSGPersonalizationPlugin", { enumerable: true, get: function () { return rulesSSGPersonalizationPlugin_1.RulesSSGPersonalizationPlugin; } });
var resolvePersonalizationPathPlugin_1 = require("./plugins/page-props-factory/resolvePersonalizationPathPlugin");
Object.defineProperty(exports, "ResolvePersonalizationPathPlugin", { enumerable: true, get: function () { return resolvePersonalizationPathPlugin_1.ResolvePersonalizationPathPlugin; } });
