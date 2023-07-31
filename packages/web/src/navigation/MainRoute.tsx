import { Routes, Route } from "react-router-dom";
import Chat from "../pages/chat/Chat";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  );
};

export default MainRoute;
