import { FiPhoneCall } from "react-icons/fi";
import ActiveIcon from "../../component/ActiveIcon";
import { IoMdVideocam } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";

const ChatHeader = ({
  image,
  name,
  isActive,
}: {
  image: string;
  name: string;
  isActive: boolean;
}) => {
  return (
    <div className="flex justify-between px-3 shadow-lg py-2 border-l">
      <div className="flex gap-2 items-center">
        <div>
          <img src={image} className="h-14 w-14 rounded-full" />
          {isActive && <ActiveIcon />}
        </div>
        <div className="font-bold text-lg">{name}</div>
      </div>
      <div className="flex gap-4 items-center  mr-2 ">
        <FiPhoneCall />
        <IoMdVideocam />
        <BsInfoCircle />
      </div>
    </div>
  );
};

export default ChatHeader;
