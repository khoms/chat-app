import ActiveIcon from "../../component/ActiveIcon";

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
      <div className="flex gap-2 items-center">
        <div className="p-4 bg-gray-300 rounded-full"></div>
        <div className="p-4 bg-gray-300 rounded-full"></div>

        <div className="p-4 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default ChatHeader;
