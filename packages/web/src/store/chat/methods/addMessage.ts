import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../../../types/Message";

const addMessageAsync = createAsyncThunk(
  "message/add",
  async (message: Message) => {
    return message;
  }
);

export default addMessageAsync;
