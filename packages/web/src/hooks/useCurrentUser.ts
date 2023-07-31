import { useSelector } from "react-redux";
import { useAppSelector } from "../types/User";

const useCurrentUser = () => {
  const { ids, entities } = useAppSelector((state) => state.auth);

  const user = entities[ids[0]];
  return { user };
};

export default useCurrentUser;
