import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const authAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const authInitialState = authAdapter.getInitialState<{
  status: Record<string, "working" | undefined>;
}>({
  status: {},
});

const auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: () => {},
});

export default auth.reducer;
