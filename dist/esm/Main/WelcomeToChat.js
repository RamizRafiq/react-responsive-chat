import React from "react";
import { ReactSVG } from "react-svg";
import welcomeToChat from "../images/welcome-to-chat.svg";
import noDataCss from "../styles/noData.module.css";
export default function WelcomeToChat(_a) {
    var _b = _a.icon, icon = _b === void 0 ? welcomeToChat : _b, _c = _a.text, text = _c === void 0 ? "Welcome to Chat" : _c, style = _a.style, type = _a.type, className = _a.className;
    return (React.createElement("div", { className: [noDataCss.container, className].join(" "), style: style },
        React.createElement(ReactSVG, { src: icon }),
        React.createElement("h4", { "data-fontsize": type == "nodata" && "small" }, text)));
}
//# sourceMappingURL=WelcomeToChat.js.map