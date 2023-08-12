import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../../../types/Message";
import axios from "axios";

const udateMessageSeen = createAsyncThunk(
  "message/seen",
  async (message: Message) => {
    const userToken = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `http://localhost:3000/api/message/seen-message`,
        message,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export default udateMessageSeen;
