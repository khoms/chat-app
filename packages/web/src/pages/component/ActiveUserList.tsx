import useCurrentUser from "../../hooks/useCurrentUser";
import { User } from "../../types/User";
import ActiveIcon from "./ActiveIcon";

export interface ActiveUser {
  userId: string;
  socketId: string;
  userInfo: User;
}

const ActiveUserList = ({
  activeUser,
  setSelectedFriend,
}: {
  activeUser: ActiveUser[];
  setSelectedFriend: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const { user } = useCurrentUser();
  return (
    <div className="flex gap-2">
      {activeUser &&
        activeUser.map((aUser) => {
          if (aUser.userInfo._id == user?._id.toString()) {
            return null;
          }
          return (
            <div
              className="flex flex-col items-center"
              key={aUser.userInfo._id}
              onClick={() => setSelectedFriend(aUser.userInfo)}
            >
              <img
                src={aUser.userInfo.image}
                className="w-10 h-10 rounded-full"
              />
              <ActiveIcon />
              <div className="max-w-[50px] overflow-hidden">
                {aUser.userInfo.name.split(" ")[0]}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ActiveUserList;
