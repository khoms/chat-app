import { LoginCred } from "../../types/User";
import { authHelpers } from "../authHelper";
import authURLS from "./apiUrls/authUrl";
export const login = async (data: LoginCred) => {
  let response = await authHelpers(
    authURLS.login.url,
    authURLS.login.method,
    data
  );
  return response;
};
