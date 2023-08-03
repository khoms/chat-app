import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import loginAsync from "./methods/login";

const authAdapter = createEntityAdapter<User>({
  selectId: (user) => user._id,
});

const userToken = localStorage.getItem("token");
const userData = localStorage.getItem("currentUser");

const authInitialState = authAdapter.getInitialState<{
  userToken: string;
  userData: string;
  status: Record<string, "working" | undefined>;
}>({
  status: {},
  userToken: userToken ?? "",
  userData: userData ?? "",
});

const auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, { payload, meta }) => {
      if (!payload) {
        return;
      }
      authAdapter.upsertOne(state, payload);
      Reflect.deleteProperty(state.status, meta.requestId);
    });

    builder.addCase(loginAsync.rejected, (state, { meta }) => {
      state.status[meta.requestId] = undefined;
    });

    builder.addCase(loginAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
    });
  },
});

export default auth.reducer;
