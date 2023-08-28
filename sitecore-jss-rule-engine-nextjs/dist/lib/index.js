"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalizationHelper = void 0;
var getItemById_1 = require("../queries/getItemById");
var sitecore_jss_nextjs_1 = require("@sitecore-jss/sitecore-jss-nextjs");
//@ts-ignore
var sitecore_jss_rule_engine_1 = require("sitecore-jss-rule-engine");
var PersonalizationHelper = /** @class */ (function () {
    function PersonalizationHelper(config) {
        this.config = null;
        this.config = config;
    }
    PersonalizationHelper.prototype.guid = function () {
        var w = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
        return "".concat(w()).concat(w(), "-").concat(w(), "-").concat(w(), "-").concat(w(), "-").concat(w()).concat(w()).concat(w());
    };
    PersonalizationHelper.prototype.getItemById = function (itemId, externalEdgeEndpoint) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var graphQLClient, graphQlResponse;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (process.env.JSS_MODE === sitecore_jss_nextjs_1.constants.JSS_MODE.DISCONNECTED) {
                            return [2 /*return*/, null];
                        }
                        graphQLClient = new sitecore_jss_nextjs_1.GraphQLRequestClient(!externalEdgeEndpoint ? (_a = this.config) === null || _a === void 0 ? void 0 : _a.graphQLEndpoint : (_b = this.config) === null || _b === void 0 ? void 0 : _b.edgeQLEndpoint, {
                            apiKey: (_c = this.config) === null || _c === void 0 ? void 0 : _c.sitecoreApiKey,
                        });
                        return [4 /*yield*/, graphQLClient.request(getItemById_1.GetItemByIdQuery, {
                                "id": itemId
                            })];
                    case 1:
                        graphQlResponse = _d.sent();
                        return [2 /*return*/, graphQlResponse];
                }
            });
        });
    };
    PersonalizationHelper.prototype.populateFields = function (rendering, externalEdgeEndpoint) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var itemResult;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = rendering === null || rendering === void 0 ? void 0 : rendering.dataSource) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getItemById(rendering === null || rendering === void 0 ? void 0 : rendering.dataSource, externalEdgeEndpoint)];
                    case 1:
                        itemResult = _b.sent();
                        if (!itemResult) {
                            return [2 /*return*/];
                        }
                        itemResult.item.fields.forEach(function (fieldObj) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                if ((_a = rendering.fields[fieldObj.name]) === null || _a === void 0 ? void 0 : _a.value) {
                                    rendering.fields[fieldObj.name].value = fieldObj.value;
                                }
                                else {
                                    rendering.fields[fieldObj.name] = {
                                        value: fieldObj.value
                                    };
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/, rendering];
                }
            });
        });
    };
    PersonalizationHelper.prototype.doPersonalizePlaceholder = function (placeholderPersonalization, elementPlaceholderRenderings, externalEdgeEndpoint) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, renderingPersonalization, y, personalizationsToAdd, _d, personalizationsToAdd_1, personalizationsToAdd_1_1, renderingPersonalization_1, newRendering, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(placeholderPersonalization && placeholderPersonalization.renderings)) return [3 /*break*/, 18];
                        _loop_1 = function (y) {
                            var renderingToUpdate;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        renderingToUpdate = elementPlaceholderRenderings[y];
                                        renderingPersonalization = placeholderPersonalization.renderings
                                            .find(function (i) { return i.name == renderingToUpdate.componentName; });
                                        if (!renderingPersonalization) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        if (renderingPersonalization.hide) {
                                            if (!renderingToUpdate) {
                                                console.log('Layout is missing rendering named ', renderingPersonalization.name);
                                                return [2 /*return*/, "continue"];
                                            }
                                            elementPlaceholderRenderings = elementPlaceholderRenderings
                                                .filter(function (y) { return y.name != renderingToUpdate.componentName; });
                                        }
                                        if (!renderingPersonalization.update) return [3 /*break*/, 2];
                                        if (!renderingToUpdate) {
                                            console.log('Layout is missing rendering named ', renderingPersonalization.name);
                                            return [2 /*return*/, "continue"];
                                        }
                                        if (!(renderingToUpdate.dataSource != renderingPersonalization.datasource)) return [3 /*break*/, 2];
                                        renderingToUpdate.dataSource = renderingPersonalization.datasource;
                                        return [4 /*yield*/, this_1.populateFields(renderingToUpdate, externalEdgeEndpoint)];
                                    case 1:
                                        _f.sent();
                                        _f.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        y = 0;
                        _e.label = 1;
                    case 1:
                        if (!(y < elementPlaceholderRenderings.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(y)];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        y++;
                        return [3 /*break*/, 1];
                    case 4:
                        personalizationsToAdd = placeholderPersonalization.renderings.filter(function (i) { return i.add; });
                        _e.label = 5;
                    case 5:
                        _e.trys.push([5, 11, 12, 17]);
                        _d = true, personalizationsToAdd_1 = __asyncValues(personalizationsToAdd);
                        _e.label = 6;
                    case 6: return [4 /*yield*/, personalizationsToAdd_1.next()];
                    case 7:
                        if (!(personalizationsToAdd_1_1 = _e.sent(), _a = personalizationsToAdd_1_1.done, !_a)) return [3 /*break*/, 10];
                        _c = personalizationsToAdd_1_1.value;
                        _d = false;
                        renderingPersonalization_1 = _c;
                        newRendering = {
                            componentName: renderingPersonalization_1.name,
                            dataSource: renderingPersonalization_1.datasource,
                            fields: {},
                            params: [],
                            experiences: {},
                            uid: this.guid()
                        };
                        return [4 /*yield*/, this.populateFields(newRendering, externalEdgeEndpoint)];
                    case 8:
                        _e.sent();
                        elementPlaceholderRenderings.push(newRendering);
                        _e.label = 9;
                    case 9:
                        _d = true;
                        return [3 /*break*/, 6];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _e.trys.push([12, , 15, 16]);
                        if (!(!_d && !_a && (_b = personalizationsToAdd_1.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _b.call(personalizationsToAdd_1)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [2 /*return*/, elementPlaceholderRenderings];
                    case 18: return [2 /*return*/, elementPlaceholderRenderings];
                }
            });
        });
    };
    PersonalizationHelper.prototype.personalize = function (props, personalizationRule) {
        var _a, e_2, _b, _c;
        var _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function () {
            var placeholdersLayout, ruleEngine, ruleEngineContext, placeholderPersonalizationsKeys, _h, placeholderPersonalizationsKeys_1, placeholderPersonalizationsKeys_1_1, phName, placeholderPersonalization, placeholderRenderings, personalizedRenderings, e_2_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        placeholdersLayout = (_d = props.layoutData.sitecore.route) === null || _d === void 0 ? void 0 : _d.placeholders;
                        if (!(placeholdersLayout && ((_e = personalizationRule === null || personalizationRule === void 0 ? void 0 : personalizationRule.value) === null || _e === void 0 ? void 0 : _e.length) > 0)) return [3 /*break*/, 13];
                        console.log('Applying personalization');
                        ruleEngine = new sitecore_jss_rule_engine_1.JssRuleEngine();
                        ruleEngineContext = ruleEngine.getRuleEngineContext();
                        ruleEngine.parseAndRunRule(personalizationRule.value, ruleEngineContext);
                        console.log("Rule parsed");
                        placeholderPersonalizationsKeys = Object.keys((_f = ruleEngineContext.personalization) === null || _f === void 0 ? void 0 : _f.placeholders);
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 7, 8, 13]);
                        _h = true, placeholderPersonalizationsKeys_1 = __asyncValues(placeholderPersonalizationsKeys);
                        _j.label = 2;
                    case 2: return [4 /*yield*/, placeholderPersonalizationsKeys_1.next()];
                    case 3:
                        if (!(placeholderPersonalizationsKeys_1_1 = _j.sent(), _a = placeholderPersonalizationsKeys_1_1.done, !_a)) return [3 /*break*/, 6];
                        _c = placeholderPersonalizationsKeys_1_1.value;
                        _h = false;
                        phName = _c;
                        console.log('Personalizing placeholder - ', phName);
                        placeholderPersonalization = (_g = ruleEngineContext.personalization) === null || _g === void 0 ? void 0 : _g.placeholders[phName];
                        placeholderRenderings = placeholdersLayout[phName];
                        return [4 /*yield*/, this.doPersonalizePlaceholder(placeholderPersonalization, placeholderRenderings, false)];
                    case 4:
                        personalizedRenderings = _j.sent();
                        placeholdersLayout[phName] = personalizedRenderings;
                        _j.label = 5;
                    case 5:
                        _h = true;
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_2_1 = _j.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _j.trys.push([8, , 11, 12]);
                        if (!(!_h && !_a && (_b = placeholderPersonalizationsKeys_1.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _b.call(placeholderPersonalizationsKeys_1)];
                    case 9:
                        _j.sent();
                        _j.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/, props];
                }
            });
        });
    };
    return PersonalizationHelper;
}());
exports.PersonalizationHelper = PersonalizationHelper;
exports.PersonalizationHelper = PersonalizationHelper;
