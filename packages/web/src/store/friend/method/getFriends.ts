import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { useAppSelector } from "../../../types/User";

const getFriendsAsync = createAsyncThunk("friend/get", async () => {
  const currentToken = localStorage.getItem("token");

  // const { entities, ids } = useAppSelector((state) => state.message);

  console.log("here we are");

  try {
    const res = await axios(`http://localhost:3000/api/user/fm`, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    // res.data.data.msgInfo = entities[ids[ids.length - 1]];
    return res.data.data;
  } catch (err) {
    return err;
    throw err;
  }
});

export default getFriendsAsync;
