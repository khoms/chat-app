import { useEffect, useState, useRef } from "react";
import Chat from "./chat/Chat";
import useCurrentUser from "../hooks/useCurrentUser";
import {
  FriendListType,
  User,
  useAppDispatch,
  useAppSelector,
} from "../types/User";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import ActiveUserList from "./component/ActiveUserList";
import { Message } from "../types/Message";
import addMessageAsync from "../store/chat/methods/addMessage";
import { RiVideoAddFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

import { FiEdit } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import getFriendsAsync from "../store/friend/method/getFriends";
import updateMessageSeen from "../store/chat/methods/seenMessage";
import getFriendWithMsgAsync from "../store/friend/method/getSingleFriendWithMessage";

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="font-bold text-lg">Chats</div>
      <div className="flex space-between gap-2">
        <div className="p-2 bg-gray-200 rounded-full text-lg">
          <BsThreeDots />
        </div>
        <div className="p-2 bg-gray-200 rounded-full text-lg">
          <RiVideoAddFill />
        </div>
        <div className="p-2 bg-gray-200 rounded-full text-lg">
          <FiEdit />
        </div>
      </div>
    </div>
  );
};

const FriendList = () => {
  const { user, currentToken } = useCurrentUser();
  const [friendsList, setFriendsList] = useState<FriendListType[]>([]);
  const [socketMessage, setSocketMessage] = useState<Message>();
  const [selectedFriend, setSelectedFriend] = useState<User>();
  const [activeUser, setActiveUser] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useAppDispatch();

  const { entities, messageSendSuccess, ids } = useAppSelector(
    (state) => state.message
  );

  const {
    entities: fEntities,
    ids: fIds,
    loading: fLoading,
  } = useAppSelector((state) => state.friend);

  const socketRef = useRef<React.MutableRefObject<Socket>>();

  console.log(selectedFriend, "SelectedFriend");

  useEffect(() => {
    dispatch(getFriendsAsync());
    // const fetchData = async () => {
    //   axios(`http://localhost:3000/api/user/fm`, {
    //     headers: {
    //       Authorization: `Bearer ${currentToken}`,
    //     },
    //   }).then((res) => setFriendsList(res.data.data));

    //   console.log("inside useEffect");
    // };
    // fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (fEntities !== undefined) {
      const firstId = fIds[0];
      setSelectedFriend(fEntities[firstId]?.fndInfo);
    }
  }, []);

  useEffect(() => {
    socketRef.current = io("ws://localhost:8000");
    socketRef.current.on("getMessage", (data: Message) => {
      setSocketMessage(data);
      dispatch(getFriendsAsync());
    });

    socketRef.current.on("typingMessageGet", (data) => {
      setIsTyping(Boolean(data.message));
    });

    socketRef?.current?.on("messageSeenResponse", (msg) => {
      dispatch(updateMessageSeen(msg));
      dispatch(getFriendWithMsgAsync(msg.recieverId));

      console.log("Seen response");
    });
  }, []);

  useEffect(() => {
    if (messageSendSuccess) {
      const lastMessage = entities[ids[ids.length - 1]] ?? {};
      socketRef.current.emit("sendMessage", lastMessage);
    }
  }, [messageSendSuccess]);

  useEffect(() => {
    if (socketMessage && selectedFriend) {
      if (
        socketMessage.senderId === selectedFriend._id &&
        socketMessage.recieverId === user?._id
      ) {
        dispatch(addMessageAsync(socketMessage));

        dispatch(updateMessageSeen(socketMessage));

        socketRef.current.emit("messageSeen", socketMessage);
      }
    }
  }, [socketMessage]);

  useEffect(() => {
    if (socketMessage) {
      if (
        socketMessage.senderId !== selectedFriend?._id &&
        socketMessage.recieverId === user?._id
      ) {
        toast.success(
          `${socketMessage.senderName ?? "SomeOne"} send a New Message`
        );
      }
    }
  }, [socketMessage]);

  useEffect(() => {
    socketRef.current.emit("adduser", user?._id, user);
  }, [user]);

  useEffect(() => {
    socketRef.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== user?._id.toString());
      setActiveUser(filterUser);
    });
  }, []);

  if (!user || !fEntities) {
    return null;
  }

  const selectFriendHandler = (friend: FriendListType) => {
    setSelectedFriend(friend?.fndInfo);
    if (
      friend?.msgInfo.status == "unseen" &&
      friend.msgInfo.recieverId == user._id
    ) {
      dispatch(updateMessageSeen(friend.msgInfo));
      dispatch(getFriendWithMsgAsync(friend.fndInfo._id));

      socketRef.current.emit("messageSeen", friend.msgInfo);
    }
  };
  return (
    <div className="flex flex-1 gap-2 ">
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "18px",
          },
        }}
      />
      <div className="w-[320px] px-4 py-8 flex flex-col gap-3 cursor-pointer ">
        <Header />
        <input
          type="text"
          placeholder="Search here..."
          className="border-1 border-gray-500 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-slate-200 rounded-3xl text-sm shadow outline-none focus:outline-none focus:ring w-full pl-4"
        />
        <div className="flex ">
          <span className="text-md text-blue-600 font-bold py-1 px-4 bg-blue-100 rounded-2xl">
            Inbox
          </span>
          <span className="text-md text-blue-600 font-bold py-1 px-4  rounded-3xl">
            Group
          </span>
        </div>

        {/* Active Users list */}
        <ActiveUserList
          activeUser={activeUser}
          setSelectedFriend={setSelectedFriend}
        />

        {/* Friend List */}

        {fIds?.map((fId, index) => {
          const friend = fEntities[fId];
          if (!friend) {
            return;
          }

          return (
            <div
              key={friend?.fndInfo._id}
              onClick={() => friend && selectFriendHandler(friend)}
              className={`flex gap-4 items-center p-2 hover:bg-blue-50 rounded-lg ${
                selectedFriend?._id === fId ? "bg-blue-100" : ""
              }`}
            >
              <img
                src={friend?.fndInfo?.image}
                className=" h-14 w-14 rounded-full"
              />
              <div className="flex flex-col gap-1 flex-1">
                <div className="font-bold">{friend?.fndInfo.name}</div>
                <div className="flex justify-between items-center">
                  <div className="">
                    {friend?.msgInfo.senderId == user._id
                      ? "You"
                      : friend?.fndInfo.name.split(" ")[0]}
                    : {friend?.msgInfo.message.text.slice(0, 16)}
                  </div>
                  {friend?.msgInfo.status == "seen" &&
                  friend.msgInfo.senderId == user._id ? (
                    <img
                      src={friend.fndInfo.image}
                      className="h-3 w-3 rounded-full"
                    />
                  ) : friend?.msgInfo.status == "unseen" &&
                    friend.msgInfo.recieverId == user._id ? (
                    <div className="bg-[#0084FF] h-3 w-3 rounded-full"></div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedFriend ? (
        <Chat
          selectedFriend={selectedFriend}
          activeUser={activeUser}
          socketRef={socketRef}
          isTyping={isTyping}
        />
      ) : (
        <div className="flex-1 flex justify-center items-center">
          {`Hello ${user.name}  Please select any one friend`}
        </div>
      )}
    </div>
  );
};

export default FriendList;
