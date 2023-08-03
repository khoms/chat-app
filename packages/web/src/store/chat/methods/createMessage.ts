import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message } from "../../../types/Message";
import axios from "axios";

const createMessageAsync = createAsyncThunk(
  "message/create",
  async (message: Message) => {
    const userToken = localStorage.getItem("token");

    console.log(message);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/message`,
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
  // {
  //   selectId: (message) => message.message._id,
  // }
);

export default createMessageAsync;
