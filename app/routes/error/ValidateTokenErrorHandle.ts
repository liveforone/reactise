import axios, { AxiosError } from "axios";
import { getRefreshToken, getUserId } from "../auth/GetToken";
import type { TokenInfo } from "../users/dto/TokenInfo";
import { UsersServerApi } from "../api/UsersServerApi";
import { AuthConstant } from "../auth/AuthConstant";
import toast from "react-hot-toast";
import type { useNavigate } from "react-router";

function extractUrl(error: any) {
  return error.config.url.replace(/^https?:\/\/localhost:8080/g, "");
}

export const validateTokenError = (
  error: AxiosError,
  navigate: ReturnType<typeof useNavigate>
) => {
  if (error.response?.status === 401) {
    const foundRefreshToken = getRefreshToken();
    const userId = getUserId();
    axios
      .post<TokenInfo>(
        UsersServerApi.REISSUE,
        {},
        {
          headers: { id: userId, "refresh-token": foundRefreshToken },
        }
      )
      .then((response) => {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem(AuthConstant.ACCESS_TOKEN, accessToken);
        localStorage.setItem(AuthConstant.REFRESH_TOKEN, refreshToken);
        navigate(0);
      })
      .catch((error: AxiosError) => {
        console.log("Refresh Token 만료");
        toast.error("토큰이 만료되었습니다. 재로그인 해주세요");
        localStorage.removeItem(AuthConstant.ACCESS_TOKEN);
        localStorage.removeItem(AuthConstant.REFRESH_TOKEN);
        navigate?.("/users/login", { replace: true });
      });
  }
};
