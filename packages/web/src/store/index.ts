import { combineReducers, configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import message from "./chat";

const reducer = combineReducers({
  auth,
  message,
});

const store = configureStore({
  reducer,
});

export default store;
