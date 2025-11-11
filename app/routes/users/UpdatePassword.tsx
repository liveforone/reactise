import axios, { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { UsersServerApi } from "../api/UsersServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { removeToken } from "../auth/RemoveToken";
import { UsersClientApi } from "../api/UsersClientApi";
import { validateTokenError } from "../error/ValidateTokenErrorHandle";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [inputPassword, setInputPassword] = useState({
    originalPw: "",
    newPw: "",
  });

  const inputPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputPassword({
      ...inputPassword,
      [name]: value,
    });
  };

  function validateInputPassword() {
    if (!inputPassword.originalPw.trim()) {
      toast.error("기존 비밀번호를 입력해주세요.");
      return false;
    }
    if (!inputPassword.newPw.trim()) {
      toast.error("새 비밀번호를 입력해주세요.");
      return false;
    }
    return true;
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputPassword()) return;
    await axios
      .patch(UsersServerApi.UPDATE_PASSWORD, inputPassword, {
        headers: createAuthHeader(),
      })
      .then((response) => {
        toast.success(response.data);
        removeToken();
        navigate(UsersClientApi.LOGIN);
      })
      .catch((error: AxiosError) => {
        validateTokenError(error, navigate);
        if (error.response?.status === 400) {
          toast.error("잘못된 입력입니다.");
          return;
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">비밀번호 변경</h2>

        {/* 기존 비밀번호 */}
        <div className="mb-4">
          <label
            htmlFor="originalPw"
            className="block text-gray-700 font-semibold mb-2"
          >
            기존 비밀번호
          </label>
          <input
            type="password"
            name="originalPw"
            placeholder="기존 비밀번호를 입력하세요"
            onChange={inputPasswordHandler}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="mb-6">
          <label
            htmlFor="newPw"
            className="block text-gray-700 font-semibold mb-2"
          >
            새 비밀번호
          </label>
          <input
            type="password"
            name="newPw"
            placeholder="새 비밀번호를 입력하세요"
            onChange={inputPasswordHandler}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        {/* 버튼 */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
