import { __awaiter, __generator } from "tslib";
import React from "react";
export default function ChatRooms(_a) {
    var _this = this;
    var rooms = _a.rooms, user = _a.user, selectedChatRoom = _a.selectedChatRoom, isLoadingRooms = _a.isLoadingRooms, RenderRoomsLoader = _a.renderChatRoomsLoader, RenderRoomsHeader = _a.renderRoomsHeader, onChatRoomSelection = _a.onChatRoomSelection, onLoadMore = _a.onLoadMore, isShowLoadMore = _a.isShowLoadMore;
    var _b = React.useState(60), height = _b[0], setHeight = _b[1];
    var roomsHeaderId = document.getElementById("chatRoomsHeader");
    var roomsHeaderHeight = roomsHeaderId === null || roomsHeaderId === void 0 ? void 0 : roomsHeaderId.clientHeight;
    var _c = React.useState(), isAddClass = _c[0], setIsAddClass = _c[1];
    React.useLayoutEffect(function () {
        if (roomsHeaderHeight)
            setHeight(roomsHeaderHeight);
    }, []);
    React.useLayoutEffect(function () {
        if (selectedChatRoom != null) {
            setIsAddClass((rooms === null || rooms === void 0 ? void 0 : rooms.findIndex(function (e) { return (selectedChatRoom === null || selectedChatRoom === void 0 ? void 0 : selectedChatRoom._id) == (e === null || e === void 0 ? void 0 : e._id); })) - 1);
            isChatInitialLoad = false;
        }
        else {
            setIsAddClass(-1);
            isChatInitialLoad = false;
        }
    }, [selectedChatRoom]);
    React.useEffect(function () {
        if (!isLoadingRooms) {
            isRoomsInitialLoad = true;
        }
    }, [isLoadingRooms]);
    function LoadMoreLoading(_a) {
        var loadMoreRef = _a.loadMoreRef, inView = _a.inView;
        return (React.createElement("div", { ref: loadMoreRef, className: loaderCss.roomsLoadMore }, isRoomsInitialLoad && inView && React.createElement(Loader, null)));
    }
    return (React.createElement("div", { className: chatsRoomsClasses.chatRooms },
        React.createElement("div", { className: chatsRoomsClasses.chatsHeaderContainer, id: "chatRoomsHeader" }, RenderRoomsHeader ? (React.createElement(RenderRoomsHeader, null)) : (React.createElement("div", { className: chatsRoomsClasses.chatsHeader },
            React.createElement("h4", null, "Chats")))),
        isLoadingRooms ? (RenderRoomsLoader ? (React.createElement(RenderRoomsLoader, { className: chatsRoomsClasses.loader, style: { height: "calc(100% - ".concat(height, "px)") } })) : (React.createElement(Loader, { className: chatsRoomsClasses.loader, style: { height: "calc(100% - ".concat(height, "px)") } }))) : (rooms === null || rooms === void 0 ? void 0 : rooms.length) > 0 ? (React.createElement(React.Fragment, null, rooms === null || rooms === void 0 ? void 0 :
            rooms.map(function (item, index) {
                return (React.createElement(Room, { dataKey: "chat-room-".concat(index), onChatRoomSelection: onChatRoomSelection, user: user, data: item, selectedChatRoom: selectedChatRoom, cCN: isAddClass == index ? chatsRoomsClasses.selectedBorder : "", id: "chat-room-".concat(index + 1) }));
            }),
            isShowLoadMore && typeof onLoadMore == "function" && (React.createElement(InView, { initialInView: false, onChange: function (inView) { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = isRoomsInitialLoad && inView;
                                if (!_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, onLoadMore()];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2:
                                _a;
                                return [2 /*return*/];
                        }
                    });
                }); } }, function (_a) {
                var loadMoreRef = _a.ref, inView = _a.inView;
                return LoadMoreLoading({ loadMoreRef: loadMoreRef, inView: inView });
            })))) : (React.createElement(WelcomeToChat, { icon: NoChatRooms, text: "No Rooms Found", style: { height: "calc(100% - ".concat(height, "px)") }, type: "nodata", cCN: chatsRoomsClasses.noData }))));
}
//# sourceMappingURL=ChatRooms.js.map