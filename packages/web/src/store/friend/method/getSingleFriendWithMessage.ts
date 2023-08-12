import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const getFriendWithMsgAsync = createAsyncThunk(
  "friend/getSingle",
  async (id: String) => {
    const currentToken = localStorage.getItem("token");

    console.log("Inside updating the f List");
    try {
      const res = await axios(`http://localhost:3000/api/user/fm/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      console.log(res.data.data);
      // res.data.data.msgInfo = entities[ids[ids.length - 1]];
      return res.data.data;
    } catch (err) {
      return err;
      throw err;
    }
  }
);

export default getFriendWithMsgAsync;
