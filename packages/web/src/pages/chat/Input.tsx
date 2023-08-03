import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useAppDispatch } from "../../types/User";
import createMessageAsync from "../../store/chat/methods/createMessage";
import { Message } from "../../types/Message";
import createUniqueId from "../../utils/createUid";

const MessageInput = ({
  setMessage,
  messageText,
  fId,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messageText: string;
  fId: string;
}) => {
  const dispatch = useAppDispatch();

  // const sendData = { senderName: "My nAme", recieverId: fId, chat: message };
  //   try {
  //     axios.post(`http://localhost:3000/api/message`, sendData, {
  //       headers: {
  //         Authorization: `Bearer ${currentToken}`,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setMessage(null);
  //   }
  const onSendHandler = async () => {
    const sendData: Message = {
      _id: createUniqueId(),
      recieverId: fId,
      chat: { text: messageText },
    };
    console.log(sendData);
    await dispatch(createMessageAsync(sendData));
  };

  return (
    <div className="flex gap-2 px-2">
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
        onChange={(e) => setMessage(e.target.value)}
      />
      <div
        className="p-4 bg-gray-300 rounded-full cursor-pointer"
        onClick={onSendHandler}
      >
        Send
      </div>
    </div>
  );
};

export default MessageInput;
