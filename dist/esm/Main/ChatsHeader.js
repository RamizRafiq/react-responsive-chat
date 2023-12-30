import React from "react";
import moment from "moment";
import chatsHeaderClasses from "../styles/chatsHeader.module.css";
import { FiArrowLeft } from "react-icons/fi";
import EmptyImg from "../images/blank-user.jpg";
export default function ChatsHeader(_a) {
    var user = _a.user, onBack = _a.onBack;
    var status = (user === null || user === void 0 ? void 0 : user.isOnline)
        ? "Online"
        : (user === null || user === void 0 ? void 0 : user.lastActive)
            ? moment(user === null || user === void 0 ? void 0 : user.lastActive).format("LLL")
            : "Offline";
    return (React.createElement("div", { className: chatsHeaderClasses.chatsHeader },
        React.createElement(FiArrowLeft, { className: chatsHeaderClasses.arrowBack, onClick: function () { return typeof onBack == "function" && onBack(null); } }),
        React.createElement("div", { className: chatsHeaderClasses.left },
            React.createElement("div", { className: chatsHeaderClasses.avatar },
                React.createElement("img", { src: user === null || user === void 0 ? void 0 : user.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = EmptyImg;
                    } })),
            React.createElement("div", { className: chatsHeaderClasses.nameAndStatus },
                React.createElement("h6", null, "".concat(user === null || user === void 0 ? void 0 : user.fullName)),
                React.createElement("span", null, status)))));
}
//# sourceMappingURL=ChatsHeader.js.map