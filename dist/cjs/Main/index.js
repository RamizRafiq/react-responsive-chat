"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var moment_1 = tslib_1.__importDefault(require("moment"));
var html_react_parser_1 = tslib_1.__importDefault(require("html-react-parser"));
var ri_1 = require("react-icons/ri");
// import { FiArrowLeft } from "react-icons/fi";
var react_intersection_observer_1 = require("react-intersection-observer");
// import { ReactSVG } from "react-svg";
var chat_module_css_1 = tslib_1.__importDefault(require("../styles/chat.module.css"));
// import chatsHeaderClasses from "../styles/chatsHeader.module.css";
var chatRooms_module_css_1 = tslib_1.__importDefault(require("../styles/chatRooms.module.css"));
var chatsContainer_module_css_1 = tslib_1.__importDefault(require("../styles/chatsContainer.module.css"));
var loader_module_css_1 = tslib_1.__importDefault(require("../styles/loader.module.css"));
// import noDataCss from "../styles/noData.module.css";
var blank_user_jpg_1 = tslib_1.__importDefault(require("../images/blank-user.jpg"));
var WelcomeToChat_1 = tslib_1.__importDefault(require("./WelcomeToChat"));
var no_rooms_svg_1 = tslib_1.__importDefault(require("../images/no-rooms.svg"));
var Room_1 = tslib_1.__importDefault(require("./Room"));
var ChatsHeader_1 = tslib_1.__importDefault(require("./ChatsHeader"));
var RenderTime_1 = tslib_1.__importDefault(require("./RenderTime"));
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
function ChatRooms(_a) {
    var _this = this;
    var rooms = _a.rooms, user = _a.user, selectedChatRoom = _a.selectedChatRoom, isLoadingRooms = _a.isLoadingRooms, RenderRoomsLoader = _a.renderChatRoomsLoader, RenderRoomsHeader = _a.renderRoomsHeader, onChatRoomSelection = _a.onChatRoomSelection, onLoadMore = _a.onLoadMore, isShowLoadMore = _a.isShowLoadMore;
    var _b = react_1.default.useState(60), height = _b[0], setHeight = _b[1];
    var roomsHeaderId = document.getElementById("chatRoomsHeader");
    var roomsHeaderHeight = roomsHeaderId === null || roomsHeaderId === void 0 ? void 0 : roomsHeaderId.clientHeight;
    var _c = react_1.default.useState(), isAddClass = _c[0], setIsAddClass = _c[1];
    react_1.default.useLayoutEffect(function () {
        if (roomsHeaderHeight)
            setHeight(roomsHeaderHeight);
    }, []);
    react_1.default.useLayoutEffect(function () {
        if (selectedChatRoom != null) {
            setIsAddClass((rooms === null || rooms === void 0 ? void 0 : rooms.findIndex(function (e) { return (selectedChatRoom === null || selectedChatRoom === void 0 ? void 0 : selectedChatRoom._id) == (e === null || e === void 0 ? void 0 : e._id); })) - 1);
            isChatInitialLoad = false;
        }
        else {
            setIsAddClass(-1);
            isChatInitialLoad = false;
        }
    }, [selectedChatRoom]);
    react_1.default.useEffect(function () {
        if (!isLoadingRooms) {
            isRoomsInitialLoad = true;
        }
    }, [isLoadingRooms]);
    function LoadMoreLoading(_a) {
        var loadMoreRef = _a.loadMoreRef, inView = _a.inView;
        return (react_1.default.createElement("div", { ref: loadMoreRef, className: loader_module_css_1.default.roomsLoadMore }, isRoomsInitialLoad && inView && react_1.default.createElement(Loader, null)));
    }
    return (react_1.default.createElement("div", { className: chatRooms_module_css_1.default.chatRooms },
        react_1.default.createElement("div", { className: chatRooms_module_css_1.default.chatsHeaderContainer, id: "chatRoomsHeader" }, RenderRoomsHeader ? (react_1.default.createElement(RenderRoomsHeader, null)) : (react_1.default.createElement("div", { className: chatRooms_module_css_1.default.chatsHeader },
            react_1.default.createElement("h4", null, "Chats")))),
        isLoadingRooms ? (RenderRoomsLoader ? (react_1.default.createElement(RenderRoomsLoader, { className: chatRooms_module_css_1.default.loader, style: { height: "calc(100% - ".concat(height, "px)") } })) : (react_1.default.createElement(Loader, { className: chatRooms_module_css_1.default.loader, style: { height: "calc(100% - ".concat(height, "px)") } }))) : (rooms === null || rooms === void 0 ? void 0 : rooms.length) > 0 ? (react_1.default.createElement(react_1.default.Fragment, null, rooms === null || rooms === void 0 ? void 0 :
            rooms.map(function (item, index) {
                return (react_1.default.createElement(Room_1.default, { dataKey: "chat-room-".concat(index), onChatRoomSelection: onChatRoomSelection, user: user, data: item, selectedChatRoom: selectedChatRoom, className: isAddClass == index ? chatRooms_module_css_1.default.selectedBorder : "", id: "chat-room-".concat(index + 1) }));
            }),
            isShowLoadMore && typeof onLoadMore == "function" && (react_1.default.createElement(react_intersection_observer_1.InView, { initialInView: false, onChange: function (inView) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
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
            })))) : (react_1.default.createElement(WelcomeToChat_1.default, { icon: no_rooms_svg_1.default, text: "No Rooms Found", style: { height: "calc(100% - ".concat(height, "px)") }, type: "nodata", className: chatRooms_module_css_1.default.noData }))));
}
var urlify = function (text) {
    var urlRegex = /(https?:\/\/[^\s]+)/gi;
    return text.replace(urlRegex, function (url) {
        return "<a href=" + url + " target=_blank>" + url + "</a>";
    });
};
function Loader(_a) {
    var _b = _a.title, title = _b === void 0 ? "Loading..." : _b, className = _a.className, style = _a.style;
    return (react_1.default.createElement("div", { className: "".concat(loader_module_css_1.default.loaderContainer, " ").concat(className), style: style },
        react_1.default.createElement("p", null, title)));
}
exports.Loader = Loader;
function Typing(_a) {
    var user = _a.user;
    return (react_1.default.createElement("div", { className: "".concat(chatsContainer_module_css_1.default.typingBox, " ") },
        react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.avatar },
            react_1.default.createElement("img", { src: user === null || user === void 0 ? void 0 : user.photo, onError: function (e) {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = blank_user_jpg_1.default;
                } })),
        react_1.default.createElement("p", { className: chatsContainer_module_css_1.default.typing },
            react_1.default.createElement("span", null),
            react_1.default.createElement("span", null),
            react_1.default.createElement("span", null))));
}
function LeftMessage(_a) {
    var _b;
    var data = _a.data, dataRef = _a.dataRef, id = _a.id, dataKey = _a.dataKey;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(chatsContainer_module_css_1.default.messageBox1, " "), ref: dataRef, id: id, key: dataKey },
            react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.avatar },
                react_1.default.createElement("img", { src: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = blank_user_jpg_1.default;
                    } })),
            react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.text },
                react_1.default.createElement("p", null, (0, html_react_parser_1.default)(urlify(data === null || data === void 0 ? void 0 : data.text))),
                react_1.default.createElement("span", null, (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.createdAt).format("hh:mm a"))))));
}
function RightMessage(_a) {
    var _b;
    var data = _a.data, id = _a.id, dataKey = _a.dataKey;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "".concat(chatsContainer_module_css_1.default.messageBox2, " "), id: id, key: dataKey },
            react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.text },
                react_1.default.createElement("p", null, (0, html_react_parser_1.default)(urlify(data === null || data === void 0 ? void 0 : data.text))),
                react_1.default.createElement("span", null, (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.createdAt).format("hh:mm a"))),
            react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.avatar },
                react_1.default.createElement("img", { src: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.photo, onError: function (e) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = blank_user_jpg_1.default;
                    } })))));
}
function ChatContainer(_a) {
    var _this = this;
    var _b;
    var user = _a.user, onSend = _a.onSend, isTyping = _a.isTyping, chats = _a.chats, onLoadMore = _a.onLoadMore, roomData = _a.roomData, RenderChatsLoader = _a.renderChatsLoader, isLoadingChats = _a.isLoadingChats, onBack = _a.onBack, unReadCount = _a.unReadCount, placeholder = _a.placeholder, onMoveToUnreadChat = _a.onMoveToUnreadChat, isShowUnReadChatsCount = _a.isShowUnReadChatsCount, unReadChatId = _a.unReadChatId, page = _a.page, isShowLoadMore = _a.isShowLoadMore, chatsRef = _a.chatsRef, _c = _a.renderChatsHeader, renderChatsHeader = _c === void 0 ? ChatsHeader_1.default : _c, _d = _a.renderChatTimeSeparator, renderChatTimeSeparator = _d === void 0 ? RenderTime_1.default : _d, chatsLimit = _a.chatsLimit, onTyping = _a.onTyping;
    var _e = react_1.default.useState(125), height = _e[0], setHeight = _e[1];
    var _f = react_1.default.useState(false), isDisplayFromEnd = _f[0], setIsDisplayFromEnd = _f[1];
    var newMessagesRef = react_1.default.useRef(null);
    var headerRef = react_1.default.useRef(null);
    var footerRef = react_1.default.useRef(null);
    var _g = react_1.default.useState(""), msg = _g[0], setMsg = _g[1];
    var messagesColumnRef = react_1.default.useRef(null);
    var memoMessages = react_1.default.useMemo(function () { return chats; }, [chats]);
    var _h = react_1.default.useState(false), userTyping = _h[0], setUserTyping = _h[1];
    var _j = react_1.default.useState(true), allowLoadMore = _j[0], setAllowLoadMore = _j[1];
    var timeoutRef = react_1.default.useRef(null);
    react_1.default.useImperativeHandle(chatsRef, function () {
        return {
            scrollToBottom: scrollToBottom,
            newMessageRef: newMessagesRef,
        };
    }, []);
    function scrollToBottom(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.block, block = _c === void 0 ? "nearest" : _c, options = _b.options;
        var messagesEnd = document.getElementById(chatsContainer_module_css_1.default.messagesEnd);
        messagesEnd === null || messagesEnd === void 0 ? void 0 : messagesEnd.scrollIntoView(tslib_1.__assign({ block: block, behavior: "smooth" }, (options && { options: options })));
    }
    function moveToMsg() {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var timeout;
            return tslib_1.__generator(this, function (_a) {
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
    react_1.default.useEffect(function () {
        setScroll(page);
    }, [page]);
    function setScroll(e) {
        var _a;
        var chatsScroll = e > 1 ? "chat".concat((e - 1) * chatsLimit + 1) : "chat".concat(chatsLimit);
        (_a = document
            .getElementById(chatsScroll)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
    react_1.default.useLayoutEffect(function () {
        var _a, _b;
        if (roomData) {
            setHeight(((_a = document.getElementsByClassName(chatsContainer_module_css_1.default.headerContainer)[0]) === null || _a === void 0 ? void 0 : _a.clientHeight) +
                ((_b = document.getElementsByClassName(chatsContainer_module_css_1.default.chatInputAndBtn)[0]) === null || _b === void 0 ? void 0 : _b.clientHeight));
        }
    }, [roomData]);
    react_1.default.useLayoutEffect(function () {
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
    react_1.default.useEffect(function () {
        typeof onTyping == "function" &&
            onTyping({ typing: userTyping, roomId: (roomData === null || roomData === void 0 ? void 0 : roomData._id) || "" });
    }, [userTyping]);
    function onLoadMoreEffect(inView) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
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
        return (react_1.default.createElement("div", { ref: loadMoreRef }, isChatInitialLoad && !allowLoadMore && inView && react_1.default.createElement(Loader, null)));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, !roomData ? (react_1.default.createElement(WelcomeToChat_1.default, null)) : (react_1.default.createElement("div", { className: "".concat([chatsContainer_module_css_1.default.chatsContainer].join(" ")) },
        react_1.default.createElement("div", { ref: headerRef, className: chatsContainer_module_css_1.default.headerContainer },
            renderChatsHeader({
                user: (user === null || user === void 0 ? void 0 : user._id) == ((_b = roomData === null || roomData === void 0 ? void 0 : roomData.sender) === null || _b === void 0 ? void 0 : _b._id)
                    ? roomData === null || roomData === void 0 ? void 0 : roomData.receiver
                    : roomData === null || roomData === void 0 ? void 0 : roomData.sender,
                onBack: onBack,
            }),
            isShowUnReadChatsCount && (react_1.default.createElement("div", { className: "".concat(chatsContainer_module_css_1.default.newMessage, " ").concat(!!unReadCount
                    ? chatsContainer_module_css_1.default.showCount
                    : chatsContainer_module_css_1.default.hideCount), onClick: function () {
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
        react_1.default.createElement("div", { className: "".concat(chatsContainer_module_css_1.default.messages, "\n           ").concat(isDisplayFromEnd && chatsContainer_module_css_1.default.ColumnEnd), ref: messagesColumnRef, style: { height: "calc(100% - ".concat(height, "px)") } },
            isLoadingChats ? (RenderChatsLoader ? (react_1.default.createElement(RenderChatsLoader, null)) : (react_1.default.createElement(Loader, null))) : (react_1.default.createElement(react_1.default.Fragment, null,
                isShowLoadMore && (react_1.default.createElement(react_intersection_observer_1.InView, { initialInView: false, onChange: onLoadMoreEffect }, function (_a) {
                    var loadMoreRef = _a.ref, inView = _a.inView;
                    return LoadMoreLoading({ loadMoreRef: loadMoreRef, inView: inView });
                })), memoMessages === null || memoMessages === void 0 ? void 0 :
                memoMessages.map(function (item, index) {
                    var _a, _b, _c;
                    return (react_1.default.createElement(react_1.default.Fragment, null,
                        index == 0
                            ? renderChatTimeSeparator({
                                time: item === null || item === void 0 ? void 0 : item.createdAt,
                                key: "chat-time-".concat(index),
                            })
                            : (0, moment_1.default)((_a = memoMessages[index - 1]) === null || _a === void 0 ? void 0 : _a.createdAt).format("DD MMM YYYY") !==
                                (0, moment_1.default)((_b = memoMessages[index]) === null || _b === void 0 ? void 0 : _b.createdAt).format("DD MMM YYYY") &&
                                renderChatTimeSeparator({
                                    time: item === null || item === void 0 ? void 0 : item.createdAt,
                                    key: "chat-time-".concat(index),
                                }),
                        ((_c = item === null || item === void 0 ? void 0 : item.user) === null || _c === void 0 ? void 0 : _c._id) == (user === null || user === void 0 ? void 0 : user._id) ? (react_1.default.createElement(RightMessage, { dataKey: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), data: item, id: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index) })) : (react_1.default.createElement(LeftMessage, { dataKey: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), data: item, id: "chat".concat((memoMessages === null || memoMessages === void 0 ? void 0 : memoMessages.length) - index), dataRef: (item === null || item === void 0 ? void 0 : item._id) == unReadChatId ? newMessagesRef : null }))));
                }),
                isTyping && react_1.default.createElement(Typing, { user: user }))),
            react_1.default.createElement("div", { id: chatsContainer_module_css_1.default.messagesEnd })),
        react_1.default.createElement("div", { className: chatsContainer_module_css_1.default.chatInputAndBtn, ref: footerRef },
            react_1.default.createElement("form", { className: chatsContainer_module_css_1.default.sendMsg },
                react_1.default.createElement("textarea", { placeholder: placeholder, value: msg, onChange: function (e) { return setMsg(e.target.value); }, required: true, onInput: function () {
                        setUserTyping(true);
                    }, onBlur: function () {
                        var timeout = setTimeout(function () { return setUserTyping(false); }, 1000);
                        timeoutRef.current = timeout;
                    }, onFocus: function () {
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                    }, onKeyDown: function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var selectionStart, selectionEnd, newText;
                        return tslib_1.__generator(this, function (_a) {
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
                                            createdAt: (0, moment_1.default)().format(),
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
                react_1.default.createElement("button", { onClick: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e === null || e === void 0 ? void 0 : e.preventDefault();
                                    if (!!!(msg === null || msg === void 0 ? void 0 : msg.trim())) return [3 /*break*/, 2];
                                    return [4 /*yield*/, onSend({
                                            user: user,
                                            text: msg,
                                            createdAt: (0, moment_1.default)().format(),
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
                    react_1.default.createElement(ri_1.RiSendPlaneFill, null))))))));
}
var Chat = react_1.default.forwardRef(function (_a, ref) {
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
                myColors[colorKey] = tslib_1.__assign(tslib_1.__assign({}, customColors[colorKey]), (colors[colorKey] != undefined && colors[colorKey]));
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
    react_1.default.useLayoutEffect(function () {
        var styleElement = stylingElement();
        if (styleElement) {
            document.head.appendChild(styleElement);
        }
    }, []);
    react_1.default.useEffect(function () {
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
    return (react_1.default.createElement("div", { id: "react-responsive-chat-container", className: "".concat(chat_module_css_1.default.chat, " ").concat(containerClassName) },
        react_1.default.createElement("div", { className: [
                selectedChatRoom == null ? chat_module_css_1.default.show : chat_module_css_1.default.hide,
            ].join(" ") },
            react_1.default.createElement(ChatRooms, { selectedChatRoom: selectedChatRoom, isLoadingRooms: isLoadingChatRooms, rooms: chatRooms, renderChatRoomsLoader: renderChatRoomsLoader, user: user, renderRoomsHeader: renderRoomsHeader, onChatRoomSelection: onChatRoomSelection, onLoadMore: onLoadMoreChatRooms, isShowLoadMore: isLoadMoreChatRooms })),
        react_1.default.createElement("div", { className: [
                selectedChatRoom != null ? chat_module_css_1.default.show : chat_module_css_1.default.hide,
            ].join(" ") },
            react_1.default.createElement(ChatContainer, { isLoadingChats: isLoadingChats, onBack: onBack, unReadCount: totalUnReadChatsCount, isShowUnReadChatsCount: isShowUnReadChatsCount, onMoveToUnreadChat: onMoveToUnreadChat, chats: chats, onSend: onSend, user: user, key: JSON.stringify(selectedChatRoom), placeholder: placeholder, isTyping: isTyping, roomData: selectedChatRoom, onLoadMore: onLoadMoreChats, renderChatsLoader: renderChatsLoader, unReadChatId: unReadChatId, page: chatsPage, isShowLoadMore: isLoadMoreChats, chatsRef: ref, renderChatsHeader: renderChatsHeader, renderChatTimeSeparator: renderChatTimeSeparator, chatsLimit: chatsLimit, onTyping: onTyping }))));
});
exports.default = Chat;
//# sourceMappingURL=index.js.map