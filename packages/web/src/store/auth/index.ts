import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import loginAsync from "./methods/login";
import fetchProfileAsync from "./methods/fetchProfileAsync";

const authAdapter = createEntityAdapter<User>({
  selectId: (user) => user._id,
});

const authInitialState = authAdapter.getInitialState<{
  status: Record<string, "working" | undefined>;
}>({
  status: {},
  // userToken: localStorage.getItem("token") ?? "",
  // userData: localStorage.getItem("currentUser") ?? "",
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

    builder.addCase(fetchProfileAsync.fulfilled, (state, { meta, payload }) => {
      authAdapter.upsertOne(state, payload);
      Reflect.deleteProperty(state.status, meta.requestId);
    });

    builder.addCase(fetchProfileAsync.rejected, (state, { meta, error }) => {
      Reflect.deleteProperty(state.status, meta.requestId);
    });

    builder.addCase(fetchProfileAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
    });
  },
});

export default auth.reducer;
