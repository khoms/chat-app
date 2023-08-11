import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import store from "../store";
import { Message } from "./Message";

export interface User {
  name: string;
  _id: string;
  image: string;
}

export interface LoginCred {
  email: string;
  password: string;
}

export interface FriendListType {
  fndInfo: User;
  msgInfo: Message;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
