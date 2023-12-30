"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var chatRooms_module_css_1 = tslib_1.__importDefault(require("../styles/chatRooms.module.css"));
var blank_user_jpg_1 = tslib_1.__importDefault(require("../images/blank-user.jpg"));
var moment_1 = tslib_1.__importDefault(require("moment"));
function Room(_a) {
    var _b, _c, _d, _e, _f;
    var data = _a.data, selectedChatRoom = _a.selectedChatRoom, onChatRoomSelection = _a.onChatRoomSelection, className = _a.className, id = _a.id, user = _a.user, dataKey = _a.dataKey;
    var roomData = user._id == ((_b = data === null || data === void 0 ? void 0 : data.sender) === null || _b === void 0 ? void 0 : _b._id) ? data === null || data === void 0 ? void 0 : data.receiver : data === null || data === void 0 ? void 0 : data.sender;
    return (react_1.default.createElement("div", { className: [
            chatRooms_module_css_1.default.room,
            (selectedChatRoom === null || selectedChatRoom === void 0 ? void 0 : selectedChatRoom._id) == (data === null || data === void 0 ? void 0 : data._id)
                ? chatRooms_module_css_1.default.selected
                : chatRooms_module_css_1.default.bg,
            className,
        ].join(" "), onClick: function () {
            if (typeof onChatRoomSelection == "function") {
                onChatRoomSelection(data);
            }
            else {
                throw new Error("onChatRoomSelection is required for selection");
            }
        }, id: id, key: dataKey },
        react_1.default.createElement("div", { className: chatRooms_module_css_1.default.left },
            react_1.default.createElement("div", { className: chatRooms_module_css_1.default.avatar },
                react_1.default.createElement("img", { src: roomData === null || roomData === void 0 ? void 0 : roomData.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = blank_user_jpg_1.default;
                    } })),
            react_1.default.createElement("div", { className: chatRooms_module_css_1.default.msgDetails },
                react_1.default.createElement("h5", null, "".concat(roomData === null || roomData === void 0 ? void 0 : roomData.fullName)),
                react_1.default.createElement("p", null, ((_c = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _c === void 0 ? void 0 : _c.text)
                    ? (_d = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _d === void 0 ? void 0 : _d.text
                    : "Start your conversion"))),
        react_1.default.createElement("div", { className: chatRooms_module_css_1.default.right, "data-center": (data === null || data === void 0 ? void 0 : data.lastMessage) == null },
            ((_e = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _e === void 0 ? void 0 : _e.createdAt) && (react_1.default.createElement("span", { className: chatRooms_module_css_1.default.time }, (0, moment_1.default)((_f = data === null || data === void 0 ? void 0 : data.lastMessage) === null || _f === void 0 ? void 0 : _f.createdAt).format("hh:mm a"))),
            !!(data === null || data === void 0 ? void 0 : data.unReadCount) && (react_1.default.createElement("span", { className: chatRooms_module_css_1.default.unseen }, data === null || data === void 0 ? void 0 : data.unReadCount)))));
}
exports.default = Room;
//# sourceMappingURL=Room.js.map