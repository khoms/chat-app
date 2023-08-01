import jwtDecode from "jwt-decode";
import { useAppSelector } from "../types/User";
import { useState, useEffect } from "react";

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
  // const [user, setUser] = useState();

  const currentToken = localStorage.getItem("token");

  const { entities, ids } = useAppSelector((state) => state.auth);

  const userId = decryptToken(currentToken);

  //   useEffect(()=>{
  // const fetchData = async () => {
  //       try {
  //         const response = await fetch(`http://localhost:3000/api/user/${userId}`);
  //         const jsonData = await response;
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   },[userId])

  const user = entities[ids[0]];
  return { user };
};

export default useCurrentUser;
