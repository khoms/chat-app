import { useEffect, useState, useRef } from "react";
import Chat from "./chat/Chat";
import useCurrentUser from "../hooks/useCurrentUser";
import { User } from "../types/User";
import axios from "axios";
import { io } from "socket.io-client";

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="font-bold text-lg">Chats</div>
      <div className="flex space-between gap-2">
        <div className="p-3 bg-gray-400 rounded-full"></div>
        <div className="p-3 bg-gray-400 rounded-full"></div>
        <div className="p-3 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

const FriendList = () => {
  const { user, currentToken } = useCurrentUser();
  const [FriendsList, setFriendsList] = useState<User[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [activeUser, setActiveUser] = useState([]);

  console.log(activeUser);

  const socketRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      // try {
      axios(`http://localhost:3000/api/user`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      }).then((res) => setFriendsList(res.data.data));
    };
    fetchData();
  }, []);
  useEffect(() => {
    setSelectedFriend(FriendsList[0] ?? null);
  }, [FriendsList]);

  useEffect(() => {
    socketRef.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socketRef.current.emit("adduser", user?._id, user);
  }, [user]);

  useEffect(() => {
    socketRef.current.on(
      "getUser",
      (
        users
        //   {
        //   users,
        // }: {
        //   users: { userId: string; socketId: string; userInfo: User };
        // }
      ) => {
        const filterUser = users.filter(
          (u) => u.userId !== user?._id.toString()
        );
        console.log(filterUser, "filterUser");
        setActiveUser(filterUser);
        console.log(users);
      }
    );
  }, []);

  if (!user || !FriendList) {
    return null;
  }
  return (
    <div className="flex flex-1 gap-2">
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
        <div className="flex gap-2">
          {activeUser &&
            activeUser.map((aUser) => {
              return (
                <div className="flex flex-col items-center">
                  <img
                    src={aUser.userInfo.image}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="bg-green-500 p-2 rounded-full absolute mt-[-10px] ml-1"></div>
                  </div>
                  <div className="max-w-[50px] overflow-hidden">
                    {aUser.userInfo.name.split(" ")[0]}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Friend List */}
        {FriendsList?.map((friend, index) => (
          <div
            key={friend._id}
            onClick={() => setSelectedFriend(friend)}
            className={`flex gap-4 items-center p-2 hover:bg-blue-50 rounded-lg ${
              selectedFriend === friend ? "bg-blue-100" : ""
            }`}
          >
            <img src={friend.image} className=" h-14 w-14 rounded-full" />
            <div className="flex flex-col gap-1">
              <div className="font-bold">{friend.name}</div>
              <div className="">Friends message</div>
            </div>
          </div>
        ))}
      </div>
      {selectedFriend ? (
        <Chat selectedFriend={selectedFriend} />
      ) : (
        <div className="flex-1 flex justify-center items-center">
          {`Hello ${user.name}  Please select any one friend`}
        </div>
      )}
    </div>
  );
};

export default FriendList;
