# React Responsive Chat

React Responsive Chat provides a great and customizable Chat UI for your React Web App

### Install

```bash
  npm install react-responsive-chat
```

or

```bash
  yarn add react-responsive-chat
```

### Usage

    import React,{useState, useEffect} from 'react';
    import ReactResponsiveChat from 'react-responsive-chat';

    function App(){
         const user={
            _id: '...',
            createdAt: ...,
            fullName: 'Test',
            photo: 'https://...',
            lastActive: '...',
            isOnline: false,
          }

        <!-- For Chat Rooms -->

        const [isLoadingChatRooms, setIsLoadingChatRooms]=useState(false);
        const [chatRooms, setChatRooms]=useState([]);
        const [selectedChatRoom, setSelectedChatRoom]=useState(null);

         <!-- For Chats -->
         const [chats, setChats]=useState([]);
         const [isLoadingChats, setIsLoadingChats]=useState(false);

         <!--Required For Load More Case-->
          const [totalRooms, setTotalRooms] = useState(0);
          const [roomsPageNo, setRoomsPageNo] = useState(0);
          const [totalChats, setTotalChats] = useState(0);
          const [chatsPageNo, setChatsPageNo] = useState(0);
          const recordsLimit = 10;

        useEffect(() => {
          if(selectedChatRoom !== null){
            setChats([
                {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                      _id: 2,
                      fullName: 'React Responsive Chat',
                      photo: 'https://...',
                   },
                   isSeen:false,
                   room:"..." // must be room id
                  },
                ])
              }
        }, [selectedChatRoom])

           return(
               <ReactResponsiveChat
                  isLoadingChatRooms={isLoadingChatRooms}
                  chatRooms={chatRooms}
                  isLoadingChats={isLoadingChats}
                  chats={chats}
                  selectedChatRoom={selectedChatRoom}
                  onChatRoomSelection={(e) => {
                     setPageNo(1);
                     setRoomData(e);
                     setIsShowingUnRead(true);
                     setMessages([]);
                    }}
                  user={user}
                  onSend={(e)=> {...}}

                  <!--Required For Load More Case-->
                  chatsLimit={recordsLimit}
                  chatsPage={chatsPageNo}
                  isLoadMoreChats={Math.ceil(totalChats / recordsLimit) > chatsPageNo}
                  isLoadMoreChatRooms={Math.ceil(totalRooms / recordsLimit) > roomsPageNo}
                  onLoadMoreChats={async (e) => {
                     const pg = pageNo + 1;
                     await chatsApiCall(pg); // Note: Page must be updated after Api call
                     setPageNo(pg);
                    }}
                  onLoadMoreChatRooms={async () => {
                      const pg = pageNo + 1;
                      await chatRoomsApiCall(pg); // Note: Page must be updated after Api call
                      setRoomsPageNo(pg);
                   }}
            />
          )}

### Codesandbox Demo

[Demo](https://codesandbox.io/s/react-responsive-chat-mzin15)

### Props

| Name                    | Type     | Description                                | Default                 |
| ----------------------- | -------- | ------------------------------------------ | ----------------------- |
| chatRooms               | Array    | Used for Chat Rooms Display                | `[]`                    |
| onLoadMoreChatRooms     | Promise  | Must be promise function                   | `undefined`             |
| renderChatRoomsLoader   | Function | Must be React Component                    | `default`               |
| selectedChatRoom        | Object   | Will be Selected Chat Room Object          | `undefined`             |
| onChatRoomSelection     | Function | Will be Call on Selection of Chat Room     | `undefined`             |
| isLoadingChatRooms      | Boolean  | Must be Boolean value                      | `false`                 |
| isLoadMoreChatRooms     | Boolean  | Must be Boolean value                      | `false`                 |
| renderRoomsHeader       | Function | Must be React Component                    | `default`               |
| chats                   | Array    | Used for Chats Display                     | `[]`                    |
| onLoadMoreChats         | Promise  | Must be promise function                   | `undefined`             |
| renderChatsLoader       | Function | Must be React Component                    | `default`               |
| isLoadingChats          | Boolean  | Must be Boolean value                      | `false`                 |
| isLoadMoreChats         | Boolean  | Must be Boolean value                      | `false`                 |
| renderChatsHeader       | Function | Must be React Component                    | `default`               |
| onSend                  | Function | Must be promise function                   | `undefined`             |
| onMoveToUnreadChat      | Function | Must be function                           | `undefined`             |
| containerClassName      | String   | Must be class                              | `undefined`             |
| isShowUnReadChatsCount  | Boolean  | Must be Boolean value                      | `false`                 |
| totalUnReadChatsCount   | Number   | Must be Number                             | `0`                     |
| user                    | Object   | Must be Object with keys (Mentioned Below) | `undefined`             |
| onBack                  | Function | Must be Function                           | `default`               |
| isTyping                | Boolean  | Must be Boolean value                      | `false`                 |
| placeholder             | String   | Placeholder is for Chat Input              | `Enter message here...` |
| unReadChatId            | String   | Must be the UnRead Chat Id of Chat Room    | `undefined`             |
| renderChatTimeSeparator | Function | Must be React Component                    | `default`               |
| chatsLimit              | Number   | Must be Number                             | `10`                    |
| chatsPage               | Number   | Must be Number                             | `undefined`             |
| onTyping                | Function | Must be Function                           | `undefined`             |
| colors                  | Object   | Must be Object with keys (Mentioned Below) | `undefined`             |
| ref                     | Object   | Must be React Ref Object                   | `null`                  |

### Object Structure Examples

#### User Object

```
const userObject={
_id: '...',
createdAt: '...',
fullName: 'Test',
photo: 'https://...',
lastActive: '...',
isOnline: false,
}

```

#### Message Object

```

const message={
_id:'...',
createdAt:new Date(),
text:'Test Message',
isSeen:false,
room:'...',
user:{
  _id: '...',
  createdAt: '...',
  fullName: 'Test User',
  photo: 'https://...',
  lastActive: '...', // Optional
  isOnline: false, // Optional
},
}

```

#### Chat Room Object

```

const chatRoom={
_id:'...',
createdAt:new Date(),
isSeen:false,
room:'...',
unReadCount:2,
sender:{
  _id:'...',
  photo:'https://...',
  fullName:'Test User 1'
},
receiver:{
  _id:'...',
  photo:'https://...',
  fullName:"Test User 2",
  lastActive: '...',
  isOnline: false,
},
lastMessage:{
  _id:'...',
  createdAt:new Date(),
  text:'Test Last Message',
  user:{
   _id:'...',
   photo:'https://...',
   fullName:'Test User 1'
   lastActive: '...',
   isOnline: false,
},
}

```

#### Colors Object

```

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

```
