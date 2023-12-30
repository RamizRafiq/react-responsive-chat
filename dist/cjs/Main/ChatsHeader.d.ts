/// <reference types="react" />
import { UserInterface } from "./interfaces";
export default function ChatsHeader({ user, onBack, }: {
    user: UserInterface;
    onBack: (e: null) => void;
}): JSX.Element;
