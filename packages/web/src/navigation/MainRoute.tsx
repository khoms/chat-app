import { Routes, Route } from "react-router-dom";
import FriendList from "../pages/Friend";

const MainRoute = () => {
  return (
    <div className="w-full flex">
      <Routes>
        <Route path="/" element={<FriendList />} />
      </Routes>
    </div>
  );
};

export default MainRoute;
