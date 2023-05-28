import React, {
  SyntheticEvent,
  CSSProperties,
  MutableRefObject,
  RefObject,
} from "react";
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

import {
  InterfaceChat,
  InterfaceChatRoomsComp,
  InterfaceChatsContainer,
  MessageInterface,
  RoomCompInterface,
  RoomInterface,
  TimeInterface,
  UserInterface,
  IScrollIntoView,
  ThemeColorsInteface,
} from "./interfaces";
const ReactSvg = ReactSVG;

let isChatInitialLoad = false;
let isRoomsInitialLoad = false;

const customColors = {
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

function Room({
  data,
  selectedChatRoom,
  onChatRoomSelection,
  className = "",
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
function ChatRooms({
  rooms,
  user,
  selectedChatRoom,
  isLoadingRooms,
  renderChatRoomsLoader: RenderRoomsLoader,
  renderRoomsHeader: RenderRoomsHeader,
  onChatRoomSelection,
  onLoadMore,
  isShowLoadMore,
}: InterfaceChatRoomsComp) {
  const [height, setHeight] = React.useState<number>(60);
  const roomsHeaderId = document.getElementById("chatRoomsHeader");
  const roomsHeaderHeight: number | string | undefined =
    roomsHeaderId?.clientHeight;

  const [isAddClass, setIsAddClass] = React.useState<number | undefined>();

  React.useLayoutEffect(() => {
    if (roomsHeaderHeight) setHeight(roomsHeaderHeight);
  }, []);
  React.useLayoutEffect(() => {
    if (selectedChatRoom != null) {
      setIsAddClass(
        rooms?.findIndex((e) => selectedChatRoom?._id == e?._id) - 1
      );
      isChatInitialLoad = false;
    } else {
      setIsAddClass(-1);
      isChatInitialLoad = false;
    }
  }, [selectedChatRoom]);

  React.useEffect(() => {
    if (!isLoadingRooms) {
      isRoomsInitialLoad = true;
    }
  }, [isLoadingRooms]);

  function LoadMoreLoading({
    loadMoreRef,
    inView,
  }: {
    loadMoreRef: React.RefObject<any> | ((node?: Element | null) => void);
    inView: boolean;
  }) {
    return (
      <div ref={loadMoreRef} className={loaderCss.roomsLoadMore}>
        {isRoomsInitialLoad && inView && <Loader />}
      </div>
    );
  }

  return (
    <div className={chatsRoomsClasses.chatRooms}>
      <div
        className={chatsRoomsClasses.chatsHeaderContainer}
        id={"chatRoomsHeader"}
      >
        {RenderRoomsHeader ? (
          <RenderRoomsHeader />
        ) : (
          <div className={chatsRoomsClasses.chatsHeader}>
            <h4>Chats</h4>
          </div>
        )}
      </div>
      {isLoadingRooms ? (
        RenderRoomsLoader ? (
          <RenderRoomsLoader
            className={chatsRoomsClasses.loader}
            style={{ height: `calc(100% - ${height}px)` }}
          />
        ) : (
          <Loader
            className={chatsRoomsClasses.loader}
            style={{ height: `calc(100% - ${height}px)` }}
          />
        )
      ) : rooms?.length > 0 ? (
        <>
          {rooms?.map((item: RoomInterface, index: number) => {
            return (
              <Room
                dataKey={`chat-room-${index}`}
                onChatRoomSelection={onChatRoomSelection}
                user={user}
                data={item}
                selectedChatRoom={selectedChatRoom}
                className={
                  isAddClass == index ? chatsRoomsClasses.selectedBorder : ""
                }
                id={`chat-room-${index + 1}`}
              />
            );
          })}

          {isShowLoadMore && typeof onLoadMore == "function" && (
            <InView
              initialInView={false}
              onChange={async (inView: boolean) => {
                isRoomsInitialLoad && inView && (await onLoadMore());
              }}
            >
              {({ ref: loadMoreRef, inView }) =>
                LoadMoreLoading({ loadMoreRef, inView })
              }
            </InView>
          )}
        </>
      ) : (
        <WelcomeToChat
          icon={NoChatRooms}
          text={"No Rooms Found"}
          style={{ height: `calc(100% - ${height}px)` }}
          type={"nodata"}
          className={chatsRoomsClasses.noData}
        />
      )}
    </div>
  );
}
function ChatsHeader({
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
const urlify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  return text.replace(urlRegex, (url) => {
    return "<a href=" + url + " target=_blank>" + url + "</a>";
  });
};

function WelcomeToChat({
  icon = welcomeToChat,
  text = "Welcome to Chat",
  style,
  type,
  className = "",
}: {
  icon?: string;
  text?: string;
  style?: object;
  type?: string;
  className?: string;
}) {
  return (
    <div className={[noDataCss.container, className].join(" ")} style={style}>
      <ReactSvg src={icon} />
      <h4 font-size={type == "nodata" && "small"}>{text}</h4>
    </div>
  );
}

export function Loader({
  title = "Loading...",
  className,
  style,
}: {
  title?: string;
  className?: string;
  style?: CSSProperties;
}): JSX.Element {
  return (
    <div className={`${loaderCss.loaderContainer} ${className}`} style={style}>
      <p>{title}</p>
    </div>
  );
}

function RenderTime({ time }: TimeInterface): JSX.Element {
  return (
    <div className={containerClasses.time}>
      <div />
      <p>{moment(time).format("DD MMM YYYY")}</p>
      <div />
    </div>
  );
}

function Typing({ user }: { user: UserInterface }): JSX.Element {
  return (
    <div className={`${containerClasses.typingBox} `}>
      <div className={containerClasses.avatar}>
        <img
          src={user?.photo}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = EmptyImg;
          }}
        />
      </div>
      <p className={containerClasses.typing}>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
  );
}

function LeftMessage({
  data,
  dataRef,
  id,
  dataKey,
}: {
  data: MessageInterface;
  dataRef: MutableRefObject<HTMLDivElement | null> | null;
  id: string;
  dataKey: string;
}): JSX.Element {
  return (
    <>
      <div
        className={`${containerClasses.messageBox1} `}
        ref={dataRef}
        id={id}
        key={dataKey}
      >
        <div className={containerClasses.avatar}>
          <img
            src={data?.user?.photo}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = EmptyImg;
            }}
          />
        </div>
        <div className={containerClasses.text}>
          <p>{Parser(urlify(data?.text))}</p>

          <span>{moment(data?.createdAt).format("hh:mm a")}</span>
        </div>
      </div>
    </>
  );
}
function RightMessage({
  data,
  id,
  dataKey,
}: {
  data: MessageInterface;
  id: string;
  dataKey: string;
}): JSX.Element {
  const [checkSeen, setCheckSeen] = React.useState<boolean>(false);

  return (
    <>
      <div
        className={`${containerClasses.messageBox2} `}
        onDoubleClick={() => setCheckSeen(!checkSeen)}
        id={id}
        key={dataKey}
      >
        <div className={containerClasses.text}>
          <p>{Parser(urlify(data?.text))}</p>
          <span>{moment(data?.createdAt).format("hh:mm a")}</span>

          <p
            className={containerClasses.seenText}
            style={{
              height: !checkSeen ? 0 : "max-content",
              visibility: !checkSeen ? "hidden" : "visible",
            }}
          >
            {data?.isSeen ? "Seen" : "Not-Seen"}
          </p>
        </div>
        <div className={containerClasses.avatar}>
          <img
            src={data?.user?.photo}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = EmptyImg;
            }}
          />
        </div>
      </div>
    </>
  );
}

function ChatContainer({
  user,
  onSend,
  isTyping,
  chats,
  onLoadMore,
  roomData,
  renderChatsLoader: RenderChatsLoader,
  isLoadingChats,
  onBack,
  unReadCount,
  placeholder,
  onMoveToUnreadChat,
  isShowUnReadChatsCount,
  unReadChatId,
  page,
  isShowLoadMore,
  chatsRef,
  renderChatsHeader = ChatsHeader,
  renderChatTimeSeparator = RenderTime,
  chatsLimit,
  onTyping,
}: InterfaceChatsContainer): JSX.Element {
  const [height, setHeight] = React.useState<number>(125);
  const [isDisplayFromEnd, setIsDisplayFromEnd] =
    React.useState<boolean>(false);
  const newMessagesRef = React.useRef<HTMLDivElement | null>(null);
  const headerRef = React.useRef<HTMLDivElement | null>(null);
  const footerRef = React.useRef<HTMLDivElement | null>(null);
  const [msg, setMsg] = React.useState<string>("");
  const messagesColumnRef = React.useRef<HTMLDivElement | null>(null);
  const memoMessages = React.useMemo(() => chats, [chats]);
  const [userTyping, setUserTyping] = React.useState<boolean>(false);
  const [allowLoadMore, setAllowLoadMore] = React.useState<boolean>(true);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useImperativeHandle(
    chatsRef,
    () => {
      return {
        scrollToBottom: scrollToBottom,
        newMessageRef: newMessagesRef,
      };
    },
    []
  );

  function scrollToBottom({
    block = "nearest",
    options,
  }: {
    block?: ScrollLogicalPosition;
    options?: IScrollIntoView;
  } = {}) {
    const messagesEnd = document.getElementById(containerClasses.messagesEnd);
    messagesEnd?.scrollIntoView({
      block,
      behavior: "smooth",
      ...(options && { options }),
    });
  }

  async function moveToMsg() {
    const timeout: NodeJS.Timeout = setTimeout(() => moveToMsg(), 10);
    new Promise((res) => {
      if (newMessagesRef?.current) {
        setTimeout(() => {
          newMessagesRef?.current?.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }, 10);
        clearTimeout(timeout);
        res(
          typeof onMoveToUnreadChat == "function"
            ? onMoveToUnreadChat()
            : () => null
        );
      } else {
        if (!isShowLoadMore) {
          clearTimeout(timeout);
          console.error("isLoadMoreChats is required for this operation");
          return;
        }
        messagesColumnRef.current?.scrollTo(0, 0);
        res(timeout);
      }
    });
  }

  React.useEffect(() => {
    setScroll(page);
  }, [page]);

  function setScroll(e: any) {
    const chatsScroll =
      e > 1 ? `chat${(e - 1) * chatsLimit + 1}` : `chat${chatsLimit}`;
    document
      .getElementById(chatsScroll)
      ?.scrollIntoView({ behavior: "auto", block: "nearest" });
  }

  React.useLayoutEffect(() => {
    if (roomData) {
      setHeight(
        document.getElementsByClassName(containerClasses.headerContainer)[0]
          ?.clientHeight +
          document.getElementsByClassName(containerClasses.chatInputAndBtn)[0]
            ?.clientHeight
      );
    }
  }, [roomData]);

  React.useLayoutEffect(() => {
    if (!isLoadingChats) {
      let h = 0;
      (messagesColumnRef.current?.childNodes ?? [])?.forEach(
        (item: ChildNode) => {
          if (item instanceof Element) {
            h += item?.clientHeight;
          }
        }
      );

      const decideDisplay: boolean =
        messagesColumnRef.current instanceof Element
          ? messagesColumnRef.current?.clientHeight > h
          : false;
      setIsDisplayFromEnd(decideDisplay);
    }
  }, [isLoadingChats, chats]);

  React.useEffect(() => {
    typeof onTyping == "function" &&
      onTyping({ typing: userTyping, roomId: roomData?._id || "" });
  }, [userTyping]);

  async function onLoadMoreEffect(inView: boolean) {
    if (typeof onLoadMore == "function") {
      if (inView && isChatInitialLoad && allowLoadMore) {
        setAllowLoadMore(false);
        onLoadMore()?.then(() => {
          setAllowLoadMore(true);
        });
      }
      isChatInitialLoad = true;
    }
  }

  function LoadMoreLoading({
    loadMoreRef,
    inView,
  }: {
    loadMoreRef: React.RefObject<any> | ((node?: Element | null) => void);
    inView: boolean;
  }) {
    return (
      <div ref={loadMoreRef}>
        {isChatInitialLoad && !allowLoadMore && inView && <Loader />}
      </div>
    );
  }

  return (
    <>
      {!roomData ? (
        <WelcomeToChat />
      ) : (
        <div className={`${[containerClasses.chatsContainer].join(" ")}`}>
          <div ref={headerRef} className={containerClasses.headerContainer}>
            {renderChatsHeader({
              user:
                user?._id == roomData?.sender?._id
                  ? roomData?.receiver
                  : roomData?.sender,
              onBack: onBack,
            })}
            {isShowUnReadChatsCount && (
              <div
                className={`${containerClasses.newMessage} ${
                  !!unReadCount
                    ? containerClasses.showCount
                    : containerClasses.hideCount
                }`}
                onClick={() => {
                  if (
                    !!unReadCount &&
                    unReadChatId &&
                    typeof onLoadMore == "function" &&
                    typeof onMoveToUnreadChat == "function"
                  ) {
                    moveToMsg();
                  } else {
                    const errorParams: any = {
                      totalUnReadChatsCount: unReadCount,
                      unReadChatId,
                      onLoadMore,
                      onMoveToUnreadChat,
                    };
                    for (let key in errorParams) {
                      if ([undefined, false].includes(errorParams[key])) {
                        return console.error(
                          `${key} is required for this operation`
                        );
                      }
                    }
                  }
                }}
              >
                {unReadCount == 1
                  ? `1 New Message`
                  : `${unReadCount} New Messages`}
              </div>
            )}
          </div>
          <div
            className={`${containerClasses.messages}
           ${isDisplayFromEnd && containerClasses.ColumnEnd}`}
            ref={messagesColumnRef}
            style={{ height: `calc(100% - ${height}px)` }}
          >
            {isLoadingChats ? (
              RenderChatsLoader ? (
                <RenderChatsLoader />
              ) : (
                <Loader />
              )
            ) : (
              <>
                {isShowLoadMore && (
                  <InView initialInView={false} onChange={onLoadMoreEffect}>
                    {({ ref: loadMoreRef, inView }) =>
                      LoadMoreLoading({ loadMoreRef, inView })
                    }
                  </InView>
                )}
                {memoMessages?.map((item: MessageInterface, index: number) => (
                  <>
                    {index == 0
                      ? renderChatTimeSeparator({
                          time: item?.createdAt,
                          key: `chat-time-${index}`,
                        })
                      : moment(memoMessages[index - 1]?.createdAt).format(
                          "DD MMM YYYY"
                        ) !==
                          moment(memoMessages[index]?.createdAt).format(
                            "DD MMM YYYY"
                          ) &&
                        renderChatTimeSeparator({
                          time: item?.createdAt,
                          key: `chat-time-${index}`,
                        })}
                    {item?.user?._id == user?._id ? (
                      <RightMessage
                        dataKey={`chat${memoMessages?.length - index}`}
                        data={item}
                        id={`chat${memoMessages?.length - index}`}
                      />
                    ) : (
                      <LeftMessage
                        dataKey={`chat${memoMessages?.length - index}`}
                        data={item}
                        id={`chat${memoMessages?.length - index}`}
                        dataRef={
                          item?._id == unReadChatId ? newMessagesRef : null
                        }
                      />
                    )}
                  </>
                ))}
                {isTyping && <Typing user={user} />}
              </>
            )}
            <div id={containerClasses.messagesEnd} />
          </div>
          <div className={containerClasses.chatInputAndBtn} ref={footerRef}>
            <form className={containerClasses.sendMsg}>
              <textarea
                placeholder={placeholder}
                value={msg}
                onChange={(e: any) => setMsg(e.target.value)}
                required
                onInput={() => {
                  setUserTyping(true);
                }}
                onBlur={() => {
                  const timeout = setTimeout(() => setUserTyping(false), 1000);
                  timeoutRef.current = timeout;
                }}
                onFocus={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                }}
                onKeyDown={async (event) => {
                  if (event.shiftKey && event.key === "Enter") {
                    event.preventDefault();
                    const selectionStart = event.currentTarget.selectionStart;
                    const selectionEnd = event.currentTarget.selectionEnd;
                    const newText =
                      msg.substring(0, selectionStart) +
                      "\n" +
                      msg.substring(selectionEnd);
                    setMsg(newText);
                    event.currentTarget.selectionStart =
                      event.currentTarget.selectionEnd = selectionStart + 1;
                  } else {
                    if (event.key == "Enter") {
                      event.preventDefault();
                    }
                    if (!event?.shiftKey && event.key == "Enter") {
                      if (!!msg?.trim()) {
                        await onSend({
                          user,
                          text: msg,
                          createdAt: moment().format(),
                          room: roomData?._id,
                          isSeen: false,
                          _id: `${Math.ceil(Math.random() * 100000000000)}`,
                        });
                        setMsg("");
                        scrollToBottom();
                      }
                      return;
                    }
                  }
                }}
              />
              <button
                onClick={async (e: any) => {
                  e?.preventDefault();
                  if (!!msg?.trim()) {
                    await onSend({
                      user,
                      text: msg,
                      createdAt: moment().format(),
                      room: roomData?._id,
                      isSeen: false,
                      _id: `${Math.ceil(Math.random() * 100000000000)}`,
                    });
                    setMsg("");
                    scrollToBottom();
                  }
                }}
              >
                <RiSendPlaneFill />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const Chat = React.forwardRef<
  MutableRefObject<RefObject<any> | null>,
  InterfaceChat
>(
  (
    {
      colors = customColors, //d
      chatRooms = [], //d
      selectedChatRoom = null, //d
      isLoadingChatRooms = false, //d
      isLoadingChats = false, //d
      chats = [], //d
      containerClassName, //d
      onSend, //d
      isShowUnReadChatsCount = false, //d
      totalUnReadChatsCount = 0, //d
      user, //d
      onBack, //d
      onMoveToUnreadChat, //d
      placeholder = "Enter your message here...", //d
      isTyping = false, //d
      onLoadMoreChats, //d
      renderChatRoomsLoader, //d
      renderChatsLoader, //d
      unReadChatId, //d
      // ref, //n
      renderRoomsHeader, //d
      renderChatsHeader, //d
      onChatRoomSelection, //d
      renderChatTimeSeparator, //d
      chatsLimit = 10, //d
      onTyping, //d
      onLoadMoreChatRooms, //d
      chatsPage = 1, //d
      isLoadMoreChats = false, //d
      isLoadMoreChatRooms = false, //d
    },
    ref
  ): JSX.Element => {
    type ColorScheme = Record<string, string | undefined>;
    function stylingElement() {
      const styleElement: HTMLStyleElement = document.createElement("style");
      let myColors: ThemeColorsInteface = customColors;
      for (const colorKey of Object.keys(
        myColors
      ) as (keyof typeof myColors)[]) {
        if (colors[colorKey]) {
          myColors[colorKey] = {
            ...customColors[colorKey],
            ...(colors[colorKey] != undefined && colors[colorKey]),
          };
        }
      }
      const rule: any = {};

      for (const key of Object.keys(myColors) as (keyof typeof myColors)[]) {
        const values: ColorScheme = Object.fromEntries(
          Object.entries(myColors[key])
        ) as ColorScheme;
        const keyValueArray = Object.entries(values);
        keyValueArray?.forEach((item) => {
          const eleKey = `--${key?.toLowerCase()}-${item[0]?.toLowerCase()}-color`;
          rule[eleKey] = `${item[1]}`;
        });
      }
      styleElement.innerHTML = `:root {${JSON.stringify(rule)
        .replace(/[{}"]/g, "")
        .replace(/,/g, ";")}}`;
      return styleElement;
    }
    React.useLayoutEffect(() => {
      const styleElement = stylingElement();
      if (styleElement) {
        document.head.appendChild(styleElement);
      }
    }, []);
    React.useEffect(() => {
      (function () {
        if (isLoadingChatRooms && onLoadMoreChatRooms == undefined) {
          throw new Error("onLoadMoreChatRooms is required");
        }
        if (
          (isLoadMoreChats && onLoadMoreChats == undefined) ||
          (onMoveToUnreadChat != undefined && onLoadMoreChats == undefined)
        ) {
          throw new Error("onLoadMoreChats is required");
        }
      })();
    }, []);
    return (
      <div
        id={"react-responsive-chat-container"}
        className={`${classes.chat} ${containerClassName}`}
      >
        <div
          className={[
            selectedChatRoom == null ? classes.show : classes.hide,
          ].join(" ")}
        >
          <ChatRooms
            selectedChatRoom={selectedChatRoom}
            isLoadingRooms={isLoadingChatRooms}
            rooms={chatRooms}
            renderChatRoomsLoader={renderChatRoomsLoader}
            user={user}
            renderRoomsHeader={renderRoomsHeader}
            onChatRoomSelection={onChatRoomSelection}
            onLoadMore={onLoadMoreChatRooms}
            isShowLoadMore={isLoadMoreChatRooms}
          />
        </div>
        <div
          className={[
            selectedChatRoom != null ? classes.show : classes.hide,
          ].join(" ")}
        >
          <ChatContainer
            isLoadingChats={isLoadingChats}
            onBack={onBack}
            unReadCount={totalUnReadChatsCount}
            isShowUnReadChatsCount={isShowUnReadChatsCount}
            onMoveToUnreadChat={onMoveToUnreadChat}
            chats={chats}
            onSend={onSend}
            user={user}
            placeholder={placeholder}
            isTyping={isTyping}
            roomData={selectedChatRoom}
            onLoadMore={onLoadMoreChats}
            renderChatsLoader={renderChatsLoader}
            unReadChatId={unReadChatId}
            page={chatsPage}
            isShowLoadMore={isLoadMoreChats}
            chatsRef={ref}
            renderChatsHeader={renderChatsHeader}
            renderChatTimeSeparator={renderChatTimeSeparator}
            chatsLimit={chatsLimit}
            onTyping={onTyping}
          />
        </div>
      </div>
    );
  }
);

export default Chat;
