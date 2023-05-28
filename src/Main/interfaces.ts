import React from "react";
export interface TimeInterface {
  time: string | Date;
  key: string;
}
export interface IScrollIntoView {
  block?: ScrollLogicalPosition;
  behavior?: "auto" | "smooth";
  inline?: "start" | "center" | "end" | "nearest";
}
export interface UserInterface {
  _id: string;
  createdAt: string;
  fullName: string;
  photo: string;
  lastActive: string | Date;
  isOnline: boolean;
}
export interface MessageInterface {
  text: string;
  createdAt: Date | string;
  _id: string | number;
  isSeen: boolean;
  user: {
    _id: string | number;
    fullName: string;
    photo: string;
  };
  room: string | object;
}

export interface RoomInterface {
  sender: UserInterface;
  receiver: UserInterface;
  lastMessage:
    | {
        text: string;
        createdAt: Date;
        _id: string;
        user: UserInterface;
      }
    | MessageInterface;
  _id: string;
  createdAt: Date;
  unReadCount: number;
}

export interface RoomCompInterface {
  data: RoomInterface;
  selectedChatRoom: RoomInterface | null;
  user: {
    fullName: string;
    photo: string;
    _id: string;
  };
  onChatRoomSelection: (e: RoomInterface) => void;
  className: string;
  id?: string;
  dataKey?: string;
}

export interface InterfaceChatRoomsComp {
  rooms: RoomInterface[];
  user: UserInterface;
  selectedChatRoom: RoomInterface | null;
  isLoadingRooms: boolean;
  renderChatRoomsLoader: React.FC<{ className: string; style: object }>;
  renderRoomsHeader: React.FC;
  onChatRoomSelection: (e: RoomInterface) => void;
  onLoadMore: () => Promise<void>;
  isShowLoadMore: boolean;
}
export type ColorType = React.CSSProperties["color"];
export interface ThemeColorsInteface {
  chatRoom: {
    name?: ColorType;
    message?: ColorType;
    time?: ColorType;
    bg?: ColorType;
    separator?: ColorType;
    hoverBg?: ColorType;
    unReadCountBg?: ColorType;
    unReadCount?: ColorType;
  };
  chatRoomSelected: {
    name?: ColorType;
    message?: ColorType;
    time?: ColorType;
    bg?: ColorType;
    separator?: ColorType;
    unReadCountBg?: ColorType;
    unReadCount?: ColorType;
  };
  myMessage: {
    text?: ColorType;
    time?: ColorType;
    bg?: ColorType;
  };
  otherMessage: {
    text?: ColorType;
    time?: ColorType;
    bg?: ColorType;
  };
  chatRoomsHeader: {
    bg?: ColorType;
    text?: ColorType;
  };
  chatsHeader: {
    bg?: ColorType;
    text?: ColorType;
  };
  chatsFooter: {
    bg?: ColorType;
    btnBg?: ColorType;
    btnText?: ColorType;
    inputBg?: ColorType;
    inputText?: ColorType;
    inputScrollTrack?: ColorType;
    inputScrollBar?: ColorType;
  };
  chatsContent: {
    bg?: ColorType;
    timeIndicator?: ColorType;
    timeText?: ColorType;
  };
  chatsScroller: {
    track?: ColorType;
    bar?: ColorType;
  };
  chatRoomsScroller: {
    track?: ColorType;
    bar?: ColorType;
  };
  noChatRoomsFound: {
    icon?: ColorType;
    text?: ColorType;
  };
  welcomeToChat: {
    icon?: ColorType;
    text?: ColorType;
  };
}

export interface InterfaceChat {
  colors: ThemeColorsInteface;
  chatRooms: RoomInterface[];
  selectedChatRoom: RoomInterface | null;
  isLoadingChatRooms: boolean;
  isLoadingChats: boolean;
  chats: MessageInterface[];
  containerClassName: string;
  onSend: (e: MessageInterface) => void;
  isShowUnReadChatsCount: boolean;
  totalUnReadChatsCount: number;
  user: UserInterface;
  onBack: (e: null) => void;
  onMoveToUnreadChat(): () => void;
  placeholder: string;
  isTyping: boolean;
  onLoadMoreChats: () => Promise<void>;
  onLoadMoreChatRooms: () => Promise<void>;
  renderChatRoomsLoader: React.FC<{ className: string; style: object }>;
  renderChatsLoader: React.FC;
  unReadChatId: string;
  isLoadMoreChatRooms: boolean;
  isLoadMoreChats: boolean;
  renderRoomsHeader: React.FC;
  renderChatsHeader: React.FC<{
    user: UserInterface;
    onBack: (e: null) => void;
  }>;
  onChatRoomSelection: (e: RoomInterface) => void;
  renderChatTimeSeparator: React.FC<TimeInterface>;
  chatsLimit: IChatsLimits;
  rooms: RoomInterface[];
  onTyping: ({ typing, roomId }: { typing: boolean; roomId: string }) => void;
  chatsPage: number;
}
type IChatsLimits = number;

export interface InterfaceChatsContainer {
  user: UserInterface;
  onSend: (e: MessageInterface) => void;
  isTyping: boolean;
  chats: MessageInterface[];
  onLoadMore: () => Promise<void>;
  roomData: RoomInterface | null;
  renderChatsLoader: React.FC;
  isLoadingChats: boolean;
  onBack: (e: null) => void;
  unReadCount: number;
  placeholder: string;
  onMoveToUnreadChat(): () => void;
  isShowUnReadChatsCount: boolean;
  unReadChatId: string;
  page: number;
  isShowLoadMore: boolean;
  chatsRef: any;
  renderChatsHeader: React.FC<{
    user: UserInterface;
    onBack: (e: null) => void;
  }>;
  renderChatTimeSeparator: React.FC<TimeInterface>;
  chatsLimit: IChatsLimits;
  onTyping: ({ typing, roomId }: { typing: boolean; roomId: string }) => void;
}
