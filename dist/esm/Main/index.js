import { __assign, __awaiter, __generator } from "tslib";
import React from "react";
import moment from "moment";
import Parser from "html-react-parser";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiArrowLeft } from "react-icons/fi";
import { InView } from "react-intersection-observer";
import { ReactSVG } from "react-svg";
import classes from "../styles/chat.module.css";
import chatsHeaderClasses from "../styles/chatsHeader.module.css";
import chatsRoomsClasses from "../styles/chatRooms.module.css";
import containerClasses from "../styles/chatsContainer.module.css";
import loaderCss from "../styles/loader.module.css";
import noDataCss from "../styles/noData.module.css";
import EmptyImg from "../images/blank-user.jpg";
import welcomeToChat from "../images/welcome-to-chat.svg";
import NoChatRooms from "../images/no-rooms.svg";
var ReactSvg = ReactSVG;
var isChatInitialLoad = false;
var isRoomsInitialLoad = false;
var customColors = {
    chatRoom: {
        name: "#000000",
        message: "grey",
        time: "black",
        bg: "#ffffff",
        separator: "#ae93ff",
        hoverBg: "#af94ff3b",
        unReadCountBg: "#ae93ff",
        unReadCount: "white",
    },
    chatRoomSelected: {
        name: "#000000",
        message: "grey",
        time: "#ae93ff",
        bg: "#af94ff1a",
        separator: "#ae93ff",
        unReadCountBg: "#ae93ff",
        unReadCount: "white",
    },
    myMessage: {
        text: "white",
        time: "white",
        bg: "#ae93ff",
    },
    otherMessage: {
        text: "black",
        time: "black",
        bg: "#d8d8d8",
    },
    chatRoomsHeader: {
        bg: "#ae93ff",
        text: "white",
    },
    chatsHeader: {
        bg: "#ae93ff",
        text: "white",
    },
    chatsFooter: {
        bg: "#0000ff17",
        btnBg: "#ae93ff",
        btnText: "white",
        inputBg: "#fff",
        inputText: "black",
        inputScrollTrack: "#d8d8d87d",
        inputScrollBar: "#ae93ff",
    },
    chatsContent: {
        bg: "#fff",
        timeIndicator: "#d8d8d8",
        timeText: "black",
    },
    chatsScroller: {
        track: "#d8d8d87d",
        bar: "#ae93ff",
    },
    chatRoomsScroller: {
        track: "#d8d8d87d",
        bar: "#ae93ff",
    },
    noChatRoomsFound: {
        icon: "#ae93ff",
        text: "#ae93ff",
    },
    welcomeToChat: {
        icon: "#ae93ff",
        text: "#ae93ff",
    },
};
function Room(_a) {
    var _b, _c, _d, _e, _f;
    var data = _a.data, selectedChatRoom = _a.selectedChatRoom, onChatRoomSelection = _a.onChatRoomSelection, _g = _a.className, className = _g === void 0 ? "" : _g, id = _a.id, user = _a.user, dataKey = _a.dataKey;
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
function ChatRooms(_a) {
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
                return (React.createElement(Room, { dataKey: "chat-room-".concat(index), onChatRoomSelection: onChatRoomSelection, user: user, data: item, selectedChatRoom: selectedChatRoom, className: isAddClass == index ? chatsRoomsClasses.selectedBorder : "", id: "chat-room-".concat(index + 1) }));
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
            })))) : (React.createElement(WelcomeToChat, { icon: NoChatRooms, text: "No Rooms Found", style: { height: "calc(100% - ".concat(height, "px)") }, type: "nodata", className: chatsRoomsClasses.noData }))));
}
function ChatsHeader(_a) {
    var user = _a.user, onBack = _a.onBack;
    var status = (user === null || user === void 0 ? void 0 : user.isOnline)
        ? "Online"
        : (user === null || user === void 0 ? void 0 : user.lastActive)
            ? moment(user === null || user === void 0 ? void 0 : user.lastActive).format("LLL")
            : "Offline";
    return (React.createElement("div", { className: chatsHeaderClasses.chatsHeader },
        React.createElement(FiArrowLeft, { className: chatsHeaderClasses.arrowBack, onClick: function () { return typeof onBack == "function" && onBack(null); } }),
        React.createElement("div", { className: chatsHeaderClasses.left },
            React.createElement("div", { className: chatsHeaderClasses.avatar },
                React.createElement("img", { src: user === null || user === void 0 ? void 0 : user.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = EmptyImg;
                    } })),
            React.createElement("div", { className: chatsHeaderClasses.nameAndStatus },
                React.createElement("h6", null, "".concat(user === null || user === void 0 ? void 0 : user.fullName)),
                React.createElement("span", null, status)))));
}
var urlify = function (text) {
    var urlRegex = /(https?:\/\/[^\s]+)/gi;
    return text.replace(urlRegex, function (url) {
        return "<a href=" + url + " target=_blank>" + url + "</a>";
    });
};
function WelcomeToChat(_a) {
    var _b = _a.icon, icon = _b === void 0 ? welcomeToChat : _b, _c = _a.text, text = _c === void 0 ? "Welcome to Chat" : _c, style = _a.style, type = _a.type, _d = _a.className, className = _d === void 0 ? "" : _d;
    return (React.createElement("div", { className: [noDataCss.container, className].join(" "), style: style },
        React.createElement(ReactSvg, { src: icon }),
        React.createElement("h4", { "font-size": type == "nodata" && "small" }, text)));
}
export function Loader(_a) {
    var _b = _a.title, title = _b === void 0 ? "Loading..." : _b, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: "".concat(loaderCss.loaderContainer, " ").concat(className), style: style },
        React.createElement("p", null, title)));
}
function RenderTime(_a) {
    var time = _a.time;
    return (React.createElement("div", { className: containerClasses.time },
        React.createElement("div", null),
        React.createElement("p", null, moment(time).format("DD MMM YYYY")),
        React.createElement("div", null)));
}
function Typing(_a) {
    var user = _a.user;
    return (React.createElement("div", { className: "".concat(containerClasses.typingBox, " ") },
        React.createElement("div", { className: containerClasses.avatar },
            React.createElement("img", { src: user === null || user === void 0 ? void 0 : user.photo, onError: function (e) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = EmptyImg;
                } })),
        React.createElement("p", { className: containerClasses.typing },
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("span", null))));
}
function LeftMessage(_a) {
    var _b;
    var data = _a.data, dataRef = _a.dataRef, id = _a.id, dataKey = _a.dataKey;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(containerClasses.messageBox1, " "), ref: dataRef, id: id, key: dataKey },
            React.createElement("div", { className: containerClasses.avatar },
                React.createElement("img", { src: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = EmptyImg;
                    } })),
            React.createElement("div", { className: containerClasses.text },
                React.createElement("p", null, Parser(urlify(data === null || data === void 0 ? void 0 : data.text))),
                React.createElement("span", null, moment(data === null || data === void 0 ? void 0 : data.createdAt).format("hh:mm a"))))));
}
function RightMessage(_a) {
    var _b;
    var data = _a.data, id = _a.id, dataKey = _a.dataKey;
    var _c = React.useState(false), checkSeen = _c[0], setCheckSeen = _c[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "".concat(containerClasses.messageBox2, " "), onDoubleClick: function () { return setCheckSeen(!checkSeen); }, id: id, key: dataKey },
            React.createElement("div", { className: containerClasses.text },
                React.createElement("p", null, Parser(urlify(data === null || data === void 0 ? void 0 : data.text))),
                React.createElement("span", null, moment(data === null || data === void 0 ? void 0 : data.createdAt).format("hh:mm a")),
                React.createElement("p", { className: containerClasses.seenText, style: {
                        height: !checkSeen ? 0 : "max-content",
                        visibility: !checkSeen ? "hidden" : "visible",
                    } }, (data === null || data === void 0 ? void 0 : data.isSeen) ? "Seen" : "Not-Seen")),
            React.createElement("div", { className: containerClasses.avatar },
                React.createElement("img", { src: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = EmptyImg;
                    } })))));
}
function ChatContainer(_a) {
    var _this = this;
    var _b;
    var user = _a.user, onSend = _a.onSend, isTyping = _a.isTyping, chats = _a.chats, onLoadMore = _a.onLoadMore, roomData = _a.roomData, RenderChatsLoader = _a.renderChatsLoader, isLoadingChats = _a.isLoadingChats, onBack = _a.onBack, unReadCount = _a.unReadCount, placeholder = _a.placeholder, onMoveToUnreadChat = _a.onMoveToUnreadChat, isShowUnReadChatsCount = _a.isShowUnReadChatsCount, unReadChatId = _a.unReadChatId, page = _a.page, isShowLoadMore = _a.isShowLoadMore, chatsRef = _a.chatsRef, _c = _a.renderChatsHeader, renderChatsHeader = _c === void 0 ? ChatsHeader : _c, _d = _a.renderChatTimeSeparator, renderChatTimeSeparator = _d === void 0 ? RenderTime : _d, chatsLimit = _a.chatsLimit, onTyping = _a.onTyping;
    var _e = React.useState(125), height = _e[0], setHeight = _e[1];
    var _f = React.useState(false), isDisplayFromEnd = _f[0], setIsDisplayFromEnd = _f[1];
    var newMessagesRef = React.useRef(null);
    var headerRef = React.useRef(null);
    var footerRef = React.useRef(null);
    var _g = React.useState(""), msg = _g[0], setMsg = _g[1];
    var messagesColumnRef = React.useRef(null);
    var memoMessages = React.useMemo(function () { return chats; }, [chats]);
    var _h = React.useState(false), userTyping = _h[0], setUserTyping = _h[1];
    var _j = React.useState(true), allowLoadMore = _j[0], setAllowLoadMore = _j[1];
    var timeoutRef = React.useRef(null);
    React.useImperativeHandle(chatsRef, function () {
        return {
            scrollToBottom: scrollToBottom,
            newMessageRef: newMessagesRef,
        };
    }, []);
    function scrollToBottom(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.block, block = _c === void 0 ? "nearest" : _c, options = _b.options;
        var messagesEnd = document.getElementById(containerClasses.messagesEnd);
        messagesEnd === null || messagesEnd === void 0 ? void 0 : messagesEnd.scrollIntoView(__assign({ block: block, behavior: "smooth" }, (options && { options: options })));
    }
    function moveToMsg() {
        return __awaiter(this, void 0, void 0, function () {
            var timeout;
            return __generator(this, function (_a) {
                timeout = setTimeout(function () { return moveToMsg(); }, 10);
                new Promise(function (res) {
                    var _a;
                    if (newMessagesRef === null || newMessagesRef === void 0 ? void 0 : newMessagesRef.current) {
                        setTimeout(function () {
                            var _a;
                            (_a = newMessagesRef === null || newMessagesRef === void 0 ? void 0 : newMessagesRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                                block: "nearest",
                                behavior: "smooth",
                            });
                        }, 10);
                        clearTimeout(timeout);
                        res(typeof onMoveToUnreadChat == "function"
                            ? onMoveToUnreadChat()
                            : function () { return null; });
                    }
                    else {
                        if (!isShowLoadMore) {
                            clearTimeout(timeout);
                            console.error("isLoadMoreChats is required for this operation");
                            return;
                        }
                        (_a = messagesColumnRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0, 0);
                        res(timeout);
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    React.useEffect(function () {
        setScroll(page);
    }, [page]);
    function setScroll(e) {
        var _a;
        var chatsScroll = e > 1 ? "chat".concat((e - 1) * chatsLimit + 1) : "chat".concat(chatsLimit);
        (_a = document
            .getElementById(chatsScroll)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
    React.useLayoutEffect(function () {
        var _a, _b;
        if (roomData) {
            setHeight(((_a = document.getElementsByClassName(containerClasses.headerContainer)[0]) === null || _a === void 0 ? void 0 : _a.clientHeight) +
                ((_b = document.getElementsByClassName(containerClasses.chatInputAndBtn)[0]) === null || _b === void 0 ? void 0 : _b.clientHeight));
        }
    }, [roomData]);
    React.useLayoutEffect(function () {
        var _a, _b, _c, _d;
        if (!isLoadingChats) {
            var h_1 = 0;
            (_c = ((_b = (_a = messagesColumnRef.current) === null || _a === void 0 ? void 0 : _a.childNodes) !== null && _b !== void 0 ? _b : [])) === null || _c === void 0 ? void 0 : _c.forEach(function (item) {
                if (item instanceof Element) {
                    h_1 += item === null || item === void 0 ? void 0 : item.clientHeight;
                }
            });
            var decideDisplay = messagesColumnRef.current instanceof Element
                ? ((_d = messagesColumnRef.current) === null || _d === void 0 ? void 0 : _d.clientHeight) > h_1
                : false;
            setIsDisplayFromEnd(decideDisplay);
        }
    }, [isLoadingChats, chats]);
    React.useEffect(function () {
        typeof onTyping == "function" &&
            onTyping({ typing: userTyping, roomId: (roomData === null || roomData === void 0 ? void 0 : roomData._id) || "" });
    }, [userTyping]);
    function onLoadMoreEffect(inView) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (typeof onLoadMore == "function") {
                    if (inView && isChatInitialLoad && allowLoadMore) {
                        setAllowLoadMore(false);
                        (_a = onLoadMore()) === null || _a === void 0 ? void 0 : _a.then(function () {
                            setAllowLoadMore(true);
                        });
                    }
                    isChatInitialLoad = true;
                }
                return [2 /*return*/];
            });
        });
    }
    function LoadMoreLoading(_a) {
        var loadMoreRef = _a.loadMoreRef, inView = _a.inView;
        return (React.createElement("div", { ref: loadMoreRef }, isChatInitialLoad && !allowLoadMore && inView && React.createElement(Loader, null)));
    }
    return (React.createElement(React.Fragment, null, !roomData ? (React.createElement(WelcomeToChat, null)) : (React.createElement("div", { className: "".concat([containerClasses.chatsContainer].join(" ")) },
        React.createElement("div", { ref: headerRef, className: containerClasses.headerContainer },
            renderChatsHeader({
                user: (user === null || user === void 0 ? void 0 : user._id) == ((_b = roomData === null || roomData === void 0 ? void 0 : roomData.sender) === null || _b === void 0 ? void 0 : _b._id)
                    ? roomData === null || roomData === void 0 ? void 0 : roomData.receiver
                    : roomData === null || roomData === void 0 ? void 0 : roomData.sender,
                onBack: onBack,
            }),
            isShowUnReadChatsCount && (React.createElement("div", { className: "".concat(containerClasses.newMessage, " ").concat(!!unReadCount
                    ? containerClasses.showCount
                    : containerClasses.hideCount), onClick: function () {
                    if (!!unReadCount &&
                        unReadChatId &&
                        typeof onLoadMore == "function" &&
                        typeof onMoveToUnreadChat == "function") {
                        moveToMsg();
                    }
                    else {
                        var errorParams = {
                            totalUnReadChatsCount: unReadCount,
                            unReadChatId: unReadChatId,
                            onLoadMore: onLoadMore,
                            onMoveToUnreadChat: onMoveToUnreadChat,
                        };
                        for (var key in errorParams) {
                            if ([undefined, false].includes(errorParams[key])) {
                                return console.error("".concat(key, " is required for this operation"));
                            }
                        }
                    }
                } }, unReadCount == 1
                ? "1 New Message"
                : "".concat(unReadCount, " New Messages")))),
        React.createElement("div", { className: "".concat(containerClasses.messages, "\n           ").concat(isDisplayFromEnd && containerClasses.ColumnEnd), ref: messagesColumnRef, style: { height: "calc(100% - ".concat(height, "px)") } },
            isLoadingChats ? (RenderChatsLoader ? (React.createElement(RenderChatsLoader, null)) : (React.createElement(Loader, null))) : (React.createElement(React.Fragment, null,
                isShowLoadMore && (React.createElement(InView, { initialInView: false, onChange: onLoadMoreEffect }, function (_a) {
                    var loadMoreRef = _a.ref, inView = _a.inView;
                    return LoadMoreLoading({ loadMoreRef: loadMoreRef, inView: inView });
                })), memoMessages === null || memoMessages === void 0 ? void 0 :
                memoMessages.map(function (item, index) {
                    var _a, _b, _c;
                    return (React.createElement(React.Fragment, null,
                        index == 0
                            ? renderChatTimeSeparator({
                                time: item === null || item === void 0 ? void 0 : item.createdAt,
                                key: "chat-time-".concat(index),
                            })
                            : moment((_a = memoMessages[index - 1]) === null || _a === void 0 ? void 0 : _a.createdAt).format("DD MMM YYYY") !==
                                moment((_b = memoMessages[index]) === null || _b === void 0 ? void 0 : _b.createdAt).format("DD MMM YYYY") &&
                                renderChatTimeSeparator({
                                    time: item === null || item === void 0 ? void 0 : item.createdAt,
                                    key: "chat-time-".concat(index),
                                }),
                        ((_c = item === null || item === void 0 ? void 0 : item.user) === null || _c === void 0 ? void 0 : _c._id) == (user === null || user === void 0 ? void 0 : user._id) ? (React.createElement(RightMessage, { dataKey: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), data: item, id: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index) })) : (React.createElement(LeftMessage, { dataKey: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), data: item, id: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), dataRef: (item === null || item === void 0 ? void 0 : item._id) == unReadChatId ? newMessagesRef : null }))));
                }),
                isTyping && React.createElement(Typing, { user: user }))),
            React.createElement("div", { id: containerClasses.messagesEnd })),
        React.createElement("div", { className: containerClasses.chatInputAndBtn, ref: footerRef },
            React.createElement("form", { className: containerClasses.sendMsg },
                React.createElement("textarea", { placeholder: placeholder, value: msg, onChange: function (e) { return setMsg(e.target.value); }, required: true, onInput: function () {
                        setUserTyping(true);
                    }, onBlur: function () {
                        var timeout = setTimeout(function () { return setUserTyping(false); }, 1000);
                        timeoutRef.current = timeout;
                    }, onFocus: function () {
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                    }, onKeyDown: function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var selectionStart, selectionEnd, newText;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(event.shiftKey && event.key === "Enter")) return [3 /*break*/, 1];
                                    event.preventDefault();
                                    selectionStart = event.currentTarget.selectionStart;
                                    selectionEnd = event.currentTarget.selectionEnd;
                                    newText = msg.substring(0, selectionStart) +
                                        "\n" +
                                        msg.substring(selectionEnd);
                                    setMsg(newText);
                                    event.currentTarget.selectionStart =
                                        event.currentTarget.selectionEnd = selectionStart + 1;
                                    return [3 /*break*/, 4];
                                case 1:
                                    if (event.key == "Enter") {
                                        event.preventDefault();
                                    }
                                    if (!(!(event === null || event === void 0 ? void 0 : event.shiftKey) && event.key == "Enter")) return [3 /*break*/, 4];
                                    if (!!!(msg === null || msg === void 0 ? void 0 : msg.trim())) return [3 /*break*/, 3];
                                    return [4 /*yield*/, onSend({
                                            user: user,
                                            text: msg,
                                            createdAt: moment().format(),
                                            room: roomData === null || roomData === void 0 ? void 0 : roomData._id,
                                            isSeen: false,
                                            _id: "".concat(Math.ceil(Math.random() * 100000000000)),
                                        })];
                                case 2:
                                    _a.sent();
                                    setMsg("");
                                    scrollToBottom();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); } }),
                React.createElement("button", { onClick: function (e) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e === null || e === void 0 ? void 0 : e.preventDefault();
                                    if (!!!(msg === null || msg === void 0 ? void 0 : msg.trim())) return [3 /*break*/, 2];
                                    return [4 /*yield*/, onSend({
                                            user: user,
                                            text: msg,
                                            createdAt: moment().format(),
                                            room: roomData === null || roomData === void 0 ? void 0 : roomData._id,
                                            isSeen: false,
                                            _id: "".concat(Math.ceil(Math.random() * 100000000000)),
                                        })];
                                case 1:
                                    _a.sent();
                                    setMsg("");
                                    scrollToBottom();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); } },
                    React.createElement(RiSendPlaneFill, null))))))));
}
var Chat = React.forwardRef(function (_a, ref) {
    var _b = _a.colors, colors = _b === void 0 ? customColors : _b, //d
    _c = _a.chatRooms, //d
    chatRooms = _c === void 0 ? [] : _c, //d
    _d = _a.selectedChatRoom, //d
    selectedChatRoom = _d === void 0 ? null : _d, //d
    _e = _a.isLoadingChatRooms, //d
    isLoadingChatRooms = _e === void 0 ? false : _e, //d
    _f = _a.isLoadingChats, //d
    isLoadingChats = _f === void 0 ? false : _f, //d
    _g = _a.chats, //d
    chats = _g === void 0 ? [] : _g, //d
    containerClassName = _a.containerClassName, //d
    onSend = _a.onSend, //d
    _h = _a.isShowUnReadChatsCount, //d
    isShowUnReadChatsCount = _h === void 0 ? false : _h, //d
    _j = _a.totalUnReadChatsCount, //d
    totalUnReadChatsCount = _j === void 0 ? 0 : _j, //d
    user = _a.user, //d
    onBack = _a.onBack, //d
    onMoveToUnreadChat = _a.onMoveToUnreadChat, //d
    _k = _a.placeholder, //d
    placeholder = _k === void 0 ? "Enter your message here..." : _k, //d
    _l = _a.isTyping, //d
    isTyping = _l === void 0 ? false : _l, //d
    onLoadMoreChats = _a.onLoadMoreChats, //d
    renderChatRoomsLoader = _a.renderChatRoomsLoader, //d
    renderChatsLoader = _a.renderChatsLoader, //d
    unReadChatId = _a.unReadChatId, //d
    // ref, //n
    renderRoomsHeader = _a.renderRoomsHeader, //d
    renderChatsHeader = _a.renderChatsHeader, //d
    onChatRoomSelection = _a.onChatRoomSelection, //d
    renderChatTimeSeparator = _a.renderChatTimeSeparator, //d
    _m = _a.chatsLimit, //d
    chatsLimit = _m === void 0 ? 10 : _m, //d
    onTyping = _a.onTyping, //d
    onLoadMoreChatRooms = _a.onLoadMoreChatRooms, //d
    _o = _a.chatsPage, //d
    chatsPage = _o === void 0 ? 1 : _o, //d
    _p = _a.isLoadMoreChats, //d
    isLoadMoreChats = _p === void 0 ? false : _p, //d
    _q = _a.isLoadMoreChatRooms, //d
    isLoadMoreChatRooms = _q === void 0 ? false : _q;
    function stylingElement() {
        var styleElement = document.createElement("style");
        var myColors = customColors;
        for (var _i = 0, _a = Object.keys(myColors); _i < _a.length; _i++) {
            var colorKey = _a[_i];
            if (colors[colorKey]) {
                myColors[colorKey] = __assign(__assign({}, customColors[colorKey]), (colors[colorKey] != undefined && colors[colorKey]));
            }
        }
        var rule = {};
        var _loop_1 = function (key) {
            var values = Object.fromEntries(Object.entries(myColors[key]));
            var keyValueArray = Object.entries(values);
            keyValueArray === null || keyValueArray === void 0 ? void 0 : keyValueArray.forEach(function (item) {
                var _a;
                var eleKey = "--".concat(key === null || key === void 0 ? void 0 : key.toLowerCase(), "-").concat((_a = item[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase(), "-color");
                rule[eleKey] = "".concat(item[1]);
            });
        };
        for (var _b = 0, _c = Object.keys(myColors); _b < _c.length; _b++) {
            var key = _c[_b];
            _loop_1(key);
        }
        styleElement.innerHTML = ":root {".concat(JSON.stringify(rule)
            .replace(/[{}"]/g, "")
            .replace(/,/g, ";"), "}");
        return styleElement;
    }
    React.useLayoutEffect(function () {
        var styleElement = stylingElement();
        if (styleElement) {
            document.head.appendChild(styleElement);
        }
    }, []);
    React.useEffect(function () {
        (function () {
            if (isLoadingChatRooms && onLoadMoreChatRooms == undefined) {
                throw new Error("onLoadMoreChatRooms is required");
            }
            if ((isLoadMoreChats && onLoadMoreChats == undefined) ||
                (onMoveToUnreadChat != undefined && onLoadMoreChats == undefined)) {
                throw new Error("onLoadMoreChats is required");
            }
        })();
    }, []);
    return (React.createElement("div", { id: "react-responsive-chat-container", className: "".concat(classes.chat, " ").concat(containerClassName) },
        React.createElement("div", { className: [
                selectedChatRoom == null ? classes.show : classes.hide,
            ].join(" ") },
            React.createElement(ChatRooms, { selectedChatRoom: selectedChatRoom, isLoadingRooms: isLoadingChatRooms, rooms: chatRooms, renderChatRoomsLoader: renderChatRoomsLoader, user: user, renderRoomsHeader: renderRoomsHeader, onChatRoomSelection: onChatRoomSelection, onLoadMore: onLoadMoreChatRooms, isShowLoadMore: isLoadMoreChatRooms })),
        React.createElement("div", { className: [
                selectedChatRoom != null ? classes.show : classes.hide,
            ].join(" ") },
            React.createElement(ChatContainer, { isLoadingChats: isLoadingChats, onBack: onBack, unReadCount: totalUnReadChatsCount, isShowUnReadChatsCount: isShowUnReadChatsCount, onMoveToUnreadChat: onMoveToUnreadChat, chats: chats, onSend: onSend, user: user, placeholder: placeholder, isTyping: isTyping, roomData: selectedChatRoom, onLoadMore: onLoadMoreChats, renderChatsLoader: renderChatsLoader, unReadChatId: unReadChatId, page: chatsPage, isShowLoadMore: isLoadMoreChats, chatsRef: ref, renderChatsHeader: renderChatsHeader, renderChatTimeSeparator: renderChatTimeSeparator, chatsLimit: chatsLimit, onTyping: onTyping }))));
});
export default Chat;
//# sourceMappingURL=index.js.map