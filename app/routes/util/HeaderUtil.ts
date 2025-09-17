import { AuthConstant } from "../auth/AuthConstant";
import { getAccessToken } from "../auth/GetToken";

export function createAuthHeader() {
  return { Authorization: AuthConstant.BEARER + getAccessToken() };
}
