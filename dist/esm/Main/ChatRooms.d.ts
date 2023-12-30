import React from "react";
import { InterfaceChatRoomsComp } from "./interfaces";
export default function ChatRooms({ rooms, user, selectedChatRoom, isLoadingRooms, renderChatRoomsLoader: RenderRoomsLoader, renderRoomsHeader: RenderRoomsHeader, onChatRoomSelection, onLoadMore, isShowLoadMore, }: InterfaceChatRoomsComp): React.JSX.Element;
