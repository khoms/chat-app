import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import store from "../store";

export interface User {
  name: string;
  id: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
