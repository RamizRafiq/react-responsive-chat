import React, { CSSProperties } from "react";
import { InterfaceChat } from "./interfaces";
export declare function Loader({ title, className, style, }: {
    title?: string;
    className?: string;
    style?: CSSProperties;
}): JSX.Element;
declare const Chat: React.ForwardRefExoticComponent<InterfaceChat & React.RefAttributes<React.MutableRefObject<React.RefObject<any> | null>>>;
export default Chat;
