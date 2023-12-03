"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var sitecore_jss_nextjs_1 = require("@sitecore-jss/sitecore-jss-nextjs");
var index_1 = require("../lib/index");
var PersonalizedPlaceholder = /** @class */ (function (_super) {
    __extends(PersonalizedPlaceholder, _super);
    function PersonalizedPlaceholder(props) {
        var _this = _super.call(this, props) || this;
        _this.updatingState = false;
        _this.graphQLEndpoint = props.endpointUrl;
        _this.ruleEngine = props.ruleEngine;
        _this.sitecoreApiKey = props.sitecoreApiKey;
        _this.state = {
            elements: null
        };
        return _this;
    }
    PersonalizedPlaceholder.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var personalizeOnEdge, personalizedRenderings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        personalizeOnEdge = this.props.rendering.fields["PersonalizeOnEdge"];
                        if (personalizeOnEdge && personalizeOnEdge.value) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.personalizePlaceholder()];
                    case 1:
                        personalizedRenderings = _a.sent();
                        if (personalizedRenderings) {
                            console.log('Set personalized renderings');
                            this.updatingState = true;
                            this.setState({
                                elements: personalizedRenderings
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PersonalizedPlaceholder.prototype.shouldComponentUpdate = function () {
        if (this.updatingState) {
            this.updatingState = false;
            return false;
        }
        return true;
    };
    PersonalizedPlaceholder.prototype.render = function () {
        var rendering = __assign({}, this.props.rendering);
        rendering.placeholders[this.props.name] = this.state.elements ? this.state.elements :
            this.props.hideInitialContents ? [] : rendering.placeholders[this.props.name];
        var placeholderProps = __assign(__assign({}, this.props), { rendering: rendering });
        return react_1.default.createElement(sitecore_jss_nextjs_1.Placeholder, __assign({ name: this.props.name }, placeholderProps));
    };
    PersonalizedPlaceholder.prototype.isClientside = function () {
        return typeof window !== 'undefined';
    };
    PersonalizedPlaceholder.prototype.isDisconnectedMode = function () {
        var disconnectedMode = this.props.sitecoreContext.site.name === 'JssDisconnectedLayoutService';
        return disconnectedMode;
    };
    PersonalizedPlaceholder.prototype.isPageEditing = function () {
        var isEditing = this.props.sitecoreContext.pageEditing;
        return isEditing;
    };
    PersonalizedPlaceholder.prototype.personalizePlaceholder = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var doRun, elementPlaceholderRenderings, personalizationRule, ruleEngineContext, placeholderPersonalizationRule, personalizationHelper, elementPlaceholderRenderings, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        doRun = this.isClientside() &&
                            !this.isDisconnectedMode() &&
                            !this.isPageEditing();
                        if (!doRun) {
                            return [2 /*return*/, null];
                        }
                        elementPlaceholderRenderings = this.props.rendering.placeholders[this.props.name];
                        personalizationRule = this.props.rendering.fields["PersonalizationRules"];
                        if (typeof (window) !== "undefined" && window) {
                            this.ruleEngine.setRequestContext({
                                url: window.location.href
                            });
                        }
                        ruleEngineContext = this.ruleEngine.getRuleEngineContext();
                        if (!(personalizationRule === null || personalizationRule === void 0 ? void 0 : personalizationRule.value)) {
                            return [2 /*return*/, elementPlaceholderRenderings];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.ruleEngine.parseAndRunRule(personalizationRule.value, ruleEngineContext);
                        placeholderPersonalizationRule = (_a = ruleEngineContext.personalization) === null || _a === void 0 ? void 0 : _a.placeholders[this.props.name];
                        console.log("Rule parsed");
                        personalizationHelper = new index_1.PersonalizationHelper(this.graphQLEndpoint, this.sitecoreApiKey);
                        return [4 /*yield*/, personalizationHelper.doPersonalizePlaceholder(placeholderPersonalizationRule, elementPlaceholderRenderings)];
                    case 2:
                        elementPlaceholderRenderings = _b.sent();
                        return [2 /*return*/, elementPlaceholderRenderings];
                    case 3:
                        error_1 = _b.sent();
                        console.warn('Failed to parse personalization rule - ', error_1);
                        return [2 /*return*/, elementPlaceholderRenderings];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PersonalizedPlaceholder;
}(react_1.default.Component));
exports.default = (0, sitecore_jss_nextjs_1.withSitecoreContext)()(PersonalizedPlaceholder);
