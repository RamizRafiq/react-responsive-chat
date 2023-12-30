"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var chatsContainer_module_css_1 = tslib_1.__importDefault(require("../styles/chatsContainer.module.css"));
var moment_1 = tslib_1.__importDefault(require("moment"));
function RenderTime(_a) {
    var time = _a.time;
    return (react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.time },
        react_1.default.createElement("div", null),
        react_1.default.createElement("p", null, (0, moment_1.default)(time).format("DD MMM YYYY")),
        react_1.default.createElement("div", null)));
}
exports.default = RenderTime;
//# sourceMappingURL=RenderTime.js.map