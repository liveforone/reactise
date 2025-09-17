import { AuthConstant } from "./AuthConstant";

export function removeToken() {
  localStorage.removeItem(AuthConstant.ACCESS_TOKEN);
  localStorage.removeItem(AuthConstant.REFRESH_TOKEN);
}

export function removeUserId() {
  localStorage.removeItem(AuthConstant.USER_ID);
}
