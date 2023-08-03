import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const getMessageAsync = createAsyncThunk(
  "message/get",
  async ({ id }: { id: string }) => {
    const currentToken = localStorage.getItem("token");
    try {
      const res = await axios(`http://localhost:3000/api/message/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      return res.data;
    } catch (err) {
      return err;
      throw err;
    }
  }
);

export default getMessageAsync;
