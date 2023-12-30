import React from "react";
import { ReactSVG } from "react-svg";
import welcomeToChat from "../images/welcome-to-chat.svg";
import noDataCss from "../styles/noData.module.css";

export default function WelcomeToChat({
  icon = welcomeToChat,
  text = "Welcome to Chat",
  style,
  type,
  className,
}: {
  icon?: string;
  text?: string;
  style?: object;
  type?: string;
  className?: string;
}) {
  return (
    <div className={[noDataCss.container, className].join(" ")} style={style}>
      <ReactSVG src={icon} />
      <h4 data-fontsize={type == "nodata" && "small"}>{text}</h4>
    </div>
  );
}
