"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var moment_1 = tslib_1.__importDefault(require("moment"));
var chatsHeader_module_css_1 = tslib_1.__importDefault(require("../styles/chatsHeader.module.css"));
var fi_1 = require("react-icons/fi");
var blank_user_jpg_1 = tslib_1.__importDefault(require("../images/blank-user.jpg"));
function ChatsHeader(_a) {
    var user = _a.user, onBack = _a.onBack;
    var status = (user === null || user === void 0 ? void 0 : user.isOnline)
        ? "Online"
        : (user === null || user === void 0 ? void 0 : user.lastActive)
            ? (0, moment_1.default)(user === null || user === void 0 ? void 0 : user.lastActive).format("LLL")
            : "Offline";
    return (react_1.default.createElement("div", { className: chatsHeader_module_css_1.default.chatsHeader },
        react_1.default.createElement(fi_1.FiArrowLeft, { className: chatsHeader_module_css_1.default.arrowBack, onClick: function () { return typeof onBack == "function" && onBack(null); } }),
        react_1.default.createElement("div", { className: chatsHeader_module_css_1.default.left },
            react_1.default.createElement("div", { className: chatsHeader_module_css_1.default.avatar },
                react_1.default.createElement("img", { src: user === null || user === void 0 ? void 0 : user.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = blank_user_jpg_1.default;
                    } })),
            react_1.default.createElement("div", { className: chatsHeader_module_css_1.default.nameAndStatus },
                react_1.default.createElement("h6", null, "".concat(user === null || user === void 0 ? void 0 : user.fullName)),
                react_1.default.createElement("span", null, status)))));
}
exports.default = ChatsHeader;
//# sourceMappingURL=ChatsHeader.js.map