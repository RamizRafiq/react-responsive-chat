import React, { SyntheticEvent } from "react";
import { RoomCompInterface, UserInterface } from "./interfaces";
import chatsRoomsClasses from "../styles/chatRooms.module.css";
import EmptyImg from "../images/blank-user.jpg";
import moment from "moment";
export default function Room({
  data,
  selectedChatRoom,
  onChatRoomSelection,
  className,
  id,
  user,
  dataKey,
}: RoomCompInterface): JSX.Element {
  const roomData: UserInterface =
    user._id == data?.sender?._id ? data?.receiver : data?.sender;

  return (
    <div
      className={[
        chatsRoomsClasses.room,
        selectedChatRoom?._id == data?._id
          ? chatsRoomsClasses.selected
          : chatsRoomsClasses.bg,
        className,
      ].join(" ")}
      onClick={() => {
        if (typeof onChatRoomSelection == "function") {
          onChatRoomSelection(data);
        } else {
          throw new Error("onChatRoomSelection is required for selection");
        }
      }}
      id={id}
      key={dataKey}
    >
      <div className={chatsRoomsClasses.left}>
        <div className={chatsRoomsClasses.avatar}>
          <img
            src={roomData?.photo}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = EmptyImg;
            }}
          />
        </div>
        <div className={chatsRoomsClasses.msgDetails}>
          <h5>{`${roomData?.fullName}`}</h5>
          <p>
            {data?.lastMessage?.text
              ? data?.lastMessage?.text
              : "Start your conversion"}
          </p>
        </div>
      </div>
      <div
        className={chatsRoomsClasses.right}
        data-center={data?.lastMessage == null}
      >
        {data?.lastMessage?.createdAt && (
          <span className={chatsRoomsClasses.time}>
            {moment(data?.lastMessage?.createdAt).format("hh:mm a")}
          </span>
        )}
        {!!data?.unReadCount && (
          <span className={chatsRoomsClasses.unseen}>{data?.unReadCount}</span>
        )}
      </div>
    </div>
  );
}
