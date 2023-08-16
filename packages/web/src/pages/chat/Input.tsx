import { ChangeEvent } from "react";
import { User, useAppDispatch } from "../../types/User";
import createMessageAsync from "../../store/chat/methods/createMessage";

import { Message } from "../../types/Message";
import createUniqueId from "../../utils/createUid";

import useCurrentUser from "../../hooks/useCurrentUser";
import { Socket } from "socket.io-client";
import { IoMdSend } from "react-icons/io";
import getFriendsAsync from "../../store/friend/method/getFriends";

const MessageInput = ({
  setMessage,
  messageText,
  fId,
  socketRef,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageText: string;
  fId: string;
  socketRef: Socket;
  selectedFriend: User;
}) => {
  const { user } = useCurrentUser();
  const dispatch = useAppDispatch();

  const onSendHandler = async () => {
    const sendData: Message = {
      _id: createUniqueId(),
      recieverId: fId,
      message: { text: messageText ?? "❤️" },
    };

    await dispatch(createMessageAsync(sendData));
    //Inplace of updating the friendlist we need to update the last message of specific friend with the last message
    await dispatch(getFriendsAsync());

    // socketRef.current.emit("sendMessage", {
    //   ...sendData,
    //   senderId: user?._id,
    //   senderName: user?.name,
    // });
    setMessage("");

    socketRef.current?.emit("typingMessage", {
      senderId: user?._id,
      recieverId: fId,
      message: "",
    });
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    socketRef.current.emit("typingMessage", {
      senderId: user?._id,
      recieverId: fId,
      message: e.target.value,
    });
  };

  return (
    <div className="flex gap-2 px-2 items-center">
      <div className="flex gap-2 items-center">
        <div className="p-4 bg-gray-300 rounded-full"></div>
        <div className="p-4 bg-gray-300 rounded-full"></div>

        <div className="p-4 bg-gray-300 rounded-full"></div>
      </div>
      <input
        type="text"
        value={messageText}
        placeholder="Aa"
        className="border-1 border-gray-500 px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-slate-200 rounded-3xl text-sm shadow outline-none focus:outline-none focus:ring w-full pl-4"
        onChange={inputHandler}
      />
      <div
        className="pr-2 rounded-full cursor-pointer text-[#0084FF] text-[26px]"
        onClick={onSendHandler}
      >
        {messageText ? <IoMdSend /> : "❤️"}
      </div>
    </div>
  );
};

export default MessageInput;
