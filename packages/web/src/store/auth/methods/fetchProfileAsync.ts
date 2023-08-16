import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const fetchProfileAsync = createAsyncThunk(
  "auth/fetchprofile",
  async ({ id }: { id: string }) => {
    const currentToken = localStorage.getItem("token");
    try {
      const res = await axios(`http://localhost:3000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      return res.data.data;
    } catch (err) {
      return err;
      throw err;
    }
  }
);

export default fetchProfileAsync;
