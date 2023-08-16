import jwtDecode from "jwt-decode";
import { User, useAppDispatch, useAppSelector } from "../types/User";
import { useRef, useEffect, useMemo } from "react";
import fetchProfileAsync from "../store/auth/methods/fetchProfileAsync";

interface DecodedToken {
  id: string;
}

const decryptToken = (token: string | null) => {
  if (!token) {
    return;
  }
  const decodedToken: DecodedToken = jwtDecode(token);
  return decodedToken.id;
};

const useCurrentUser = () => {
  const { entities, ids, status } = useAppSelector((state) => state.auth);
  const reqId = useRef("");
  const loading = status[reqId.current] === "working";

  const dispatch = useAppDispatch();
  const user = entities[ids[0]];

  const currentToken = localStorage.getItem("token");

  const userId = useMemo(() => {
    return decryptToken(currentToken);
  }, [currentToken]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const req = dispatch(fetchProfileAsync({ id: userId }));
    reqId.current = req.requestId;
  }, [userId]);

  return { user, userId, currentToken, loading };
};

export default useCurrentUser;
