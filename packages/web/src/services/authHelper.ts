import axios from "axios";
import { LoginCred } from "../types/User";

const BASE_URL = "http://localhost:3000/api/";
export const authHelpers = async (
  url: string,
  method: string,
  data: LoginCred
) => {
  let response = await axios({
    method: method,
    url: BASE_URL + url,
    data: { ...data },
  });
  return response.data;
};
