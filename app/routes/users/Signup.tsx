import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { UsersServerApi } from "../api/UsersServerApi";
import { axiosErrorHandle } from "../error/AxiosErrorHandle";
import { Link } from "react-router";
import { UsersClientApi } from "../api/UsersClientApi";
import toast from "react-hot-toast";

const Signup = () => {
  interface UserInput {
    username: "";
    password: "";
  }
  const [userInput, setUserInput] = useState<UserInput>({
    username: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const userInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  function validateUserInput() {
    if (!userInput.username.trim()) {
      toast.error("이메일을 입력해주세요.");
      return false;
    }

    if (!userInput.password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return false;
    }
    return true;
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateUserInput()) return;
    await axios
      .post(UsersServerApi.SIGNUP, userInput)
      .then((response) => {
        toast.success(response.data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        axiosErrorHandle(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {!isSubmitted ? (
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              name="username"
              placeholder="이메일을 입력하세요"
              onChange={userInputHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={userInputHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            회원가입
          </button>
        </form>
      ) : (
        <div className="text-center bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            회원가입 성공
          </h2>
          <Link
            to={UsersClientApi.LOGIN}
            className="inline-block mt-2 text-blue-600 hover:underline"
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
};

export default Signup;
