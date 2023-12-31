import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/Message";
import createMessageAsync from "./methods/createMessage";
import getMessageAsync from "./methods/getMessage";
import addMessageAsync from "./methods/addMessage";
import updateMessageSeen from "./methods/seenMessage";

const messageAdapter = createEntityAdapter<Message>({
  selectId: (message) => message._id,
});

const messageInitial = messageAdapter.getInitialState<{
  status: Record<string, "working" | undefined>;
  loading: boolean;
  messageSendSuccess: boolean;
}>({
  status: {},
  loading: true,
  messageSendSuccess: false,
});

const message = createSlice({
  name: "message",
  initialState: messageInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMessageAsync.fulfilled, (state, { payload }) => {
      messageAdapter.upsertOne(state, payload);
      state.loading = false;
      state.messageSendSuccess = true;
    });

    builder.addCase(createMessageAsync.rejected, (state, { error }) => {
      console.log(error);
      state.loading = false;
      state.messageSendSuccess = false;
    });

    builder.addCase(createMessageAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
      state.loading = false;
      state.messageSendSuccess = false;
    });

    builder.addCase(addMessageAsync.fulfilled, (state, { payload }) => {
      messageAdapter.upsertOne(state, payload);
      state.loading = false;
    });

    builder.addCase(addMessageAsync.rejected, (state, { error }) => {
      console.log(error);
      state.loading = false;
    });

    builder.addCase(addMessageAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
      state.loading = true;
    });

    builder.addCase(getMessageAsync.fulfilled, (state, { meta, payload }) => {
      messageAdapter.setAll(state, payload);
      Reflect.deleteProperty(state.status, meta.requestId);
      state.loading = false;
    });

    builder.addCase(getMessageAsync.rejected, (state, { meta, error }) => {
      Reflect.deleteProperty(state.status, meta.requestId);
      state.loading = false;
    });

    builder.addCase(getMessageAsync.pending, (state, { meta }) => {
      state.status[meta.requestId] = "working";
      state.loading = true;
    });

    builder.addCase(updateMessageSeen.fulfilled, (state, { payload, meta }) => {
      const existing = state.entities[payload.id];
      if (existing) {
        messageAdapter.upsertOne(state, { ...existing, ...payload });
      }
      Reflect.deleteProperty(state.status, meta.requestId);
      state.loading = false;
    });
  },
});

export default message.reducer;