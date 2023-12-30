"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_svg_1 = require("react-svg");
var welcome_to_chat_svg_1 = tslib_1.__importDefault(require("../images/welcome-to-chat.svg"));
var noData_module_css_1 = tslib_1.__importDefault(require("../styles/noData.module.css"));
function WelcomeToChat(_a) {
    var _b = _a.icon, icon = _b === void 0 ? welcome_to_chat_svg_1.default : _b, _c = _a.text, text = _c === void 0 ? "Welcome to Chat" : _c, style = _a.style, type = _a.type, className = _a.className;
    return (react_1.default.createElement("div", { className: [noData_module_css_1.default.container, className].join(" "), style: style },
        react_1.default.createElement(react_svg_1.ReactSVG, { src: icon }),
        react_1.default.createElement("h4", { "data-fontsize": type == "nodata" && "small" }, text)));
}
exports.default = WelcomeToChat;
//# sourceMappingURL=WelcomeToChat.js.map