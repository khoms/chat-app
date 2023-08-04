import { RefObject, useEffect, useRef, useState } from "react";
import { User, useAppDispatch, useAppSelector } from "../../types/User";
import MessageInput from "./Input";
import getMessageAsync from "../../store/chat/methods/getMessage";
import useCurrentUser from "../../hooks/useCurrentUser";
import { ActiveUser } from "../component/ActiveUserList";
import ActiveIcon from "../component/ActiveIcon";

const Chat = ({
  selectedFriend,
  activeUser,
}: {
  selectedFriend: User;
  activeUser: ActiveUser[];
}) => {
  const [message, setMessage] = useState<string>("");
  const { user } = useCurrentUser();
  const { entities, ids, loading } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  const scrollRef = useRef<RefObject<HTMLElement>>();

  const isActive = activeUser.find((u) => u.userId === selectedFriend._id);

  useEffect(() => {
    if (!user?._id || !selectedFriend) {
      return;
    }

    dispatch(getMessageAsync({ id: selectedFriend._id })).catch((error) => {
      console.error("Error fetching messages:", error);
    });
  }, [dispatch, selectedFriend]);

  //   useEffect(()=>{
  // scrollRef?.current.scrollIntoView({behavior:'smooth'})
  //   },[entities])

  return (
    <div className="h-[100vh] py-8 flex-1 flex flex-col justify-between">
      <div className="flex justify-between px-3 shadow-lg py-2 border-l">
        <div className="flex gap-2 items-center">
          <div>
            <img
              src={selectedFriend.image}
              className="h-14 w-14 rounded-full"
            />
            {isActive && <ActiveIcon />}
          </div>
          <div className="font-bold text-lg">{selectedFriend.name}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="p-4 bg-gray-300 rounded-full"></div>
          <div className="p-4 bg-gray-300 rounded-full"></div>

          <div className="p-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Message section */}
      <div className="flex flex-1 border border-1 m-2 ">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            Loading Message...
          </div>
        ) : (
          <div className="w-full flex-col items-center justify-center m-2">
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
                        {message?.message.text}
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
      />
    </div>
  );
};

export default Chat;
