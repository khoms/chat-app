import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../../services/apiServices/authService";
import { LoginCred } from "../../../types/User";

const loginAsync = createAsyncThunk("auth/login", async (user: LoginCred) => {
  // Login
  const data = await login(user);
  // await dispatch(data.user);
  localStorage.setItem("token", data.token);
  localStorage.setItem("currentUser", data.user);
  // return { user: data.user, tokken: data.token };

  return data.user;
});

export default loginAsync;
