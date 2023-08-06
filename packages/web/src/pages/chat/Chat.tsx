import { useEffect, useRef, useState } from "react";
import { User, useAppDispatch, useAppSelector } from "../../types/User";
import MessageInput from "./Input";
import getMessageAsync from "../../store/chat/methods/getMessage";
import useCurrentUser from "../../hooks/useCurrentUser";
import { ActiveUser } from "../component/ActiveUserList";
import { Socket } from "socket.io-client";
import ChatHeader from "./component/ChatHeader";

const Chat = ({
  selectedFriend,
  activeUser,
  socketRef,
}: {
  selectedFriend: User;
  activeUser: ActiveUser[];
  socketRef: React.MutableRefObject<Socket>;
}) => {
  const [message, setMessage] = useState<string>("");
  const { user } = useCurrentUser();
  const { entities, ids, loading } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  const scrollRef = useRef<HTMLElement>(null);

  const isActive = activeUser.find((u) => u.userId === selectedFriend._id);

  useEffect(() => {
    if (!user?._id || !selectedFriend) {
      return;
    }

    dispatch(getMessageAsync({ id: selectedFriend._id })).catch((error) => {
      console.error("Error fetching messages:", error);
    });
  }, [dispatch, selectedFriend]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [entities]);

  return (
    <div className=" py-8 flex-1 flex flex-col justify-between overflow-y-scroll">
      <ChatHeader
        image={selectedFriend.image}
        name={selectedFriend.name}
        isActive={Boolean(isActive)}
      />

      {/* Message section */}
      <div className=" flex flex-1 border border-1 m-2 ">
        {loading ? (
          <div className="w-full h-[75vh] flex justify-center items-center">
            Loading Message...
          </div>
        ) : (
          <div className="w-full h-[75vh] overflow-scroll flex-col items-center justify-center m-2">
            {ids.map((id) => {
              const message = entities[id];
              const isSender = Boolean(user?._id === message?.senderId);

              return (
                <div key={id}>
                  {isSender ? (
                    <div
                      ref={scrollRef}
                      className="w-full  flex gap-1 flex-row-reverse p-1 my-1 text-white "
                      key={id}
                    >
                      <div className="flex items-center mt-4">
                        <div className="w-6 h-6 bg-[#0084FF] rounded-full"></div>
                      </div>
                      <div
                        className=" min-w-[60px] flex justify-center
                    bg-[#0084FF] px-4 py-3 rounded-full"
                      >
                        {message?.message.text}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="w-full  flex gap-1 p-1 my-1 text-white "
                      key={id}
                    >
                      <div className="flex items-center mt-4">
                        <img
                          src={selectedFriend.image}
                          className="w-6 h-6 rounded-full bottom-0"
                        />
                      </div>
                      <div className="min-w-[60px] flex justify-center bg-slate-300 text-black px-4 py-3 rounded-full">
                        {message?.message?.text}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer section */}
      <MessageInput
        setMessage={setMessage}
        messageText={message}
        fId={selectedFriend._id}
        socketRef={socketRef}
        selectedFriend={selectedFriend}
      />
    </div>
  );
};

export default Chat;
