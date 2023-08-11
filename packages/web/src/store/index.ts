import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import message from "./chat";
import friend from "./friend";

const reducer = combineReducers({
  auth,
  message,
  friend,
});

const store = configureStore({
  reducer,
});

export default store;
