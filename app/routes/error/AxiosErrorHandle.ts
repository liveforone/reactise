import axios from "axios";
import { getRefreshToken, getUserId } from "../auth/GetToken";
import type { TokenInfo } from "../users/dto/TokenInfo";
import { UsersServerApi } from "../api/UsersServerApi";
import { AuthConstant } from "../auth/AuthConstant";
import { UsersClientApi } from "../api/UsersClientApi";
import toast from "react-hot-toast";

function extractUrl(error: any) {
  return error.config.url.replace(/^https?:\/\/localhost:8080/g, "");
}

export async function axiosErrorHandle(error: any) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      const foundRefreshToken = getRefreshToken();
      const userId = getUserId();
      try {
        await axios
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
            const currentUrl = window.location.href;
            window.location.replace(currentUrl);
          });
      } catch {
        console.log("Refresh Token 만료");
        toast.error("토큰이 만료되었습니다. 재로그인 해주세요");
        localStorage.removeItem(AuthConstant.ACCESS_TOKEN);
        localStorage.removeItem(AuthConstant.REFRESH_TOKEN);
        window.location.replace(UsersClientApi.LOGIN);
      }
    } else {
      toast.error("에러가 발생했습니다.");
      window.location.replace("http://localhost:3000/");
    }
  }
}
