import { AuthConstant } from "./AuthConstant";

export function getAccessToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AuthConstant.ACCESS_TOKEN);
  }
}

export function getRefreshToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AuthConstant.REFRESH_TOKEN);
  }
}

export function getUserId() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AuthConstant.USER_ID);
  }
}
