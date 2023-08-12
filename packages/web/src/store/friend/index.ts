import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FriendListType, User } from "../../types/User";
import getFriendsAsync from "./method/getFriends";
import getFriendWithMsgAsync from "./method/getSingleFriendWithMessage";

const friendAdpater = createEntityAdapter<FriendListType>({
  selectId: (friend) => friend.fndInfo._id,
});

const friendInitial = friendAdpater.getInitialState<{
  status: Record<string, "working" | undefined>;
  loading: boolean;
}>({
  status: {},
  loading: true,
});

const friend = createSlice({
  name: "friend",
  initialState: friendInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFriendsAsync.fulfilled, (state, { meta, payload }) => {
      friendAdpater.setAll(state, payload);
      Reflect.deleteProperty(state.status, meta.requestId);
      state.loading = false;
    });

    builder.addCase(getFriendsAsync.rejected, (state, { meta, error }) => {
      Reflect.deleteProperty(state.status, meta.requestId);
      state.loading = false;
    });

    builder.addCase(getFriendsAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
      state.loading = true;
    });

    builder.addCase(
      getFriendWithMsgAsync.fulfilled,
      (state, { meta, payload }) => {
        friendAdpater.upsertOne(state, payload);
        Reflect.deleteProperty(state.status, meta.requestId);
        state.loading = false;
      }
    );
  },
});

export default friend.reducer;
