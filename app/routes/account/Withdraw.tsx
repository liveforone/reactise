import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import { UsersServerApi } from "../api/UsersServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import toast from "react-hot-toast";

const Withdraw = () => {
  const [userInput, setUserInput] = useState({
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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInput.password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    await axios
      .post(UsersServerApi.WITHDRAW, userInput, {
        headers: createAuthHeader(),
      })
      .then(() => {
        setIsSubmitted(true);
      })
      .catch(() => {
        toast.error("비밀번호가 틀렸습니다.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {!isSubmitted ? (
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={userInputHandler}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            탈퇴
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">탈퇴 성공</h2>
          <p className="text-gray-600 mb-4">안녕히 가세요</p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
