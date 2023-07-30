import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AuthRoute;
