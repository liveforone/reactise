import axios from "axios";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { getAccessToken } from "../auth/GetToken";
import { createAuthHeader } from "../util/HeaderUtil";
import { removeToken, removeUserId } from "../auth/RemoveToken";
import { UsersServerApi } from "../api/UsersServerApi";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (getAccessToken() != null) {
      await axios
        .post(UsersServerApi.LOGOUT, {}, { headers: createAuthHeader() })
        .then((response) => {
          toast.success(response.data);
        })
        .catch(() => {
          toast.error("토큰이 유효하지 않습니다. 재로그인 후 시도해주세요");
        });

      removeToken();
      removeUserId();
    } else {
      toast.error("이미 로그아웃 되어있습니다.");
    }
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          로그아웃 하시겠습니까?
        </h2>
        <form onSubmit={submitHandler}>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
