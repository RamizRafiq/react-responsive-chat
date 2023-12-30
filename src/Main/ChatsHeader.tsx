import React, { SyntheticEvent } from "react";
import moment from "moment";
import { UserInterface } from "./interfaces";
import chatsHeaderClasses from "../styles/chatsHeader.module.css";
import { FiArrowLeft } from "react-icons/fi";
import EmptyImg from "../images/blank-user.jpg";

export default function ChatsHeader({
  user,
  onBack,
}: {
  user: UserInterface;
  onBack: (e: null) => void;
}): JSX.Element {
  const status = user?.isOnline
    ? "Online"
    : user?.lastActive
    ? moment(user?.lastActive).format("LLL")
    : "Offline";

  return (
    <div className={chatsHeaderClasses.chatsHeader}>
      <FiArrowLeft
        className={chatsHeaderClasses.arrowBack}
        onClick={() => typeof onBack == "function" && onBack(null)}
      />
      <div className={chatsHeaderClasses.left}>
        <div className={chatsHeaderClasses.avatar}>
          <img
            src={user?.photo}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = EmptyImg;
            }}
          />
        </div>
        <div className={chatsHeaderClasses.nameAndStatus}>
          <h6>{`${user?.fullName}`}</h6>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}
