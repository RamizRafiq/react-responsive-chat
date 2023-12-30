import React from "react";
import chatsRoomsClasses from "../styles/chatRooms.module.css";
import EmptyImg from "../images/blank-user.jpg";
import moment from "moment";
export default function Room(_a) {
    var _b, _c, _d, _e, _f;
    var data = _a.data, selectedChatRoom = _a.selectedChatRoom, onChatRoomSelection = _a.onChatRoomSelection, className = _a.className, id = _a.id, user = _a.user, dataKey = _a.dataKey;
    var roomData = user._id == ((_b = data === null || data === void 0 ? void 0 : data.sender) === null || _b === void 0 ? void 0 : _b._id) ? data === null || data === void 0 ? void 0 : data.receiver : data === null || data === void 0 ? void 0 : data.sender;
    return (React.createElement("div", { className: [
            chatsRoomsClasses.room,
            (selectedChatRoom === null || selectedChatRoom === void 0 ? void 0 : selectedChatRoom._id) == (data === null || data === void 0 ? void 0 : data._id)
                ? chatsRoomsClasses.selected
                : chatsRoomsClasses.bg,
            className,
        ].join(" "), onClick: function () {
            if (typeof onChatRoomSelection == "function") {
                onChatRoomSelection(data);
            }
            else {
                throw new Error("onChatRoomSelection is required for selection");
            }
        }, id: id, key: dataKey },
        React.createElement("div", { className: chatsRoomsClasses.left },
            React.createElement("div", { className: chatsRoomsClasses.avatar },
                React.createElement("img", { src: roomData === null || roomData === void 0 ? void 0 : roomData.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = EmptyImg;
                    } })),
            React.createElement("div", { className: chatsRoomsClasses.msgDetails },
                React.createElement("h5", null, "".concat(roomData === null || roomData === void 0 ? void 0 : roomData.fullName)),
                React.createElement("p", null, ((_c = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _c === void 0 ? void 0 : _c.text)
                    ? (_d = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _d === void 0 ? void 0 : _d.text
                    : "Start your conversion"))),
        React.createElement("div", { className: chatsRoomsClasses.right, "data-center": (data === null || data === void 0 ? void 0 : data.lastMessage) == null },
            ((_e = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _e === void 0 ? void 0 : _e.createdAt) && (React.createElement("span", { className: chatsRoomsClasses.time }, moment((_f = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _f === void 0 ? void 0 : _f.createdAt).format("hh:mm a"))),
            !!(data === null || data === void 0 ? void 0 : data.unReadCount) && (React.createElement("span", { className: chatsRoomsClasses.unseen }, data === null || data === void 0 ? void 0 : data.unReadCount)))));
}
//# sourceMappingURL=Room.js.map