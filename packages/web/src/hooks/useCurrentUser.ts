import jwtDecode from "jwt-decode";
import { User, useAppSelector } from "../types/User";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

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
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const currentToken = localStorage.getItem("token");

  // const { entities, ids } = useAppSelector((state) => state.auth);
  const userId = useMemo(() => {
    return decryptToken(currentToken);
  }, [currentToken]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      // setLoading(true);
      // try {
      axios(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
        .then((res) => setUser(res.data.data))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [userId]);

  // const user = entities[ids[0]];
  return { user, userId, currentToken, loading };
};

export default useCurrentUser;
