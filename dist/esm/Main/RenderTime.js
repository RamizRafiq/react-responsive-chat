import React from "react";
import containerClasses from "../styles/chatsContainer.module.css";
import moment from "moment";
export default function RenderTime(_a) {
    var time = _a.time;
    return (React.createElement("div", { className: containerClasses.time },
        React.createElement("div", null),
        React.createElement("p", null, moment(time).format("DD MMM YYYY")),
        React.createElement("div", null)));
}
//# sourceMappingURL=RenderTime.js.map