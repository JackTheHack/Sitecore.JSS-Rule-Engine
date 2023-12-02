"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNextJS = void 0;
var addRenderingCommand_1 = __importDefault(require("./actions/addRenderingCommand"));
var setDataSourceCommand_1 = __importDefault(require("./actions/setDataSourceCommand"));
var hideRenderingCommand_1 = __importDefault(require("./actions/hideRenderingCommand"));
function registerNextJS(ruleEngine) {
    ruleEngine.registerCommand('{56CADC0A-B671-4127-80F7-983AE4E4C10C}', addRenderingCommand_1.default);
    ruleEngine.registerCommand('{A2DB53FC-D6AA-4D7C-B03C-F92954030A6B}', hideRenderingCommand_1.default);
    ruleEngine.registerCommand('{225168CE-C093-4F10-96C3-5B1983DF5261}', setDataSourceCommand_1.default);
}
exports.registerNextJS = registerNextJS;
