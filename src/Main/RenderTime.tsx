import React from "react";
import { TimeInterface } from "./interfaces";
import containerClasses from "../styles/chatsContainer.module.css";
import moment from "moment";

export default function RenderTime({ time }: TimeInterface): JSX.Element {
  return (
    <div className={containerClasses.time}>
      <div />
      <p>{moment(time).format("DD MMM YYYY")}</p>
      <div />
    </div>
  );
}
