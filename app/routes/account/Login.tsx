import axios, { AxiosError } from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { TokenInfo } from "../users/dto/TokenInfo";
import { UsersServerApi } from "../api/UsersServerApi";
import { AuthConstant } from "../auth/AuthConstant";
import { validateTokenError } from "../error/ValidateTokenErrorHandle";
import { getAccessToken } from "../auth/GetToken";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitted, setSubmit] = useState(false);

  interface LoginInput {
    username: string;
    password: string;
  }
  const [loginInput, setLoginInput] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const loginInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  function validateLoginInput() {
    if (!loginInput.username.trim()) {
      toast.error("이메일을 입력해주세요.");
      return false;
    }

    if (!loginInput.password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return false;
    }
    return true;
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateLoginInput()) return;

    await axios
      .post<TokenInfo>(UsersServerApi.LOGIN, loginInput)
      .then((response) => {
        localStorage.setItem(AuthConstant.USER_ID, response.data.id);
        localStorage.setItem(
          AuthConstant.ACCESS_TOKEN,
          response.data.accessToken
        );
        localStorage.setItem(
          AuthConstant.REFRESH_TOKEN,
          response.data.refreshToken
        );
      })
      .catch((error: AxiosError) => {
        validateTokenError(error, navigate);
        if (error.response?.status === 400) {
          toast.error("잘못된 입력입니다.");
          return;
        }
      });

    setSubmit(true);
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (getAccessToken()) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {!isSubmitted ? (
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 font-semibold text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              name="username"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={loginInputHandler}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-semibold text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={loginInputHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            로그인
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">환영합니다!</h2>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
