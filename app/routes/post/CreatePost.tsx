import axios, { AxiosError } from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { getUserId } from "../auth/GetToken";
import { PostServerApi } from "../api/PostServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { PostClientApi } from "../api/PostClientApi";
import { validateTokenError } from "../error/ValidateTokenErrorHandle";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreatePost = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    writerId: getUserId(),
    title: "",
    content: "",
  });

  const inputTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const inputContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  function validateInputData() {
    if (!inputData.title.trim()) {
      toast.error("제목을 입력해주세요.");
      return false;
    }
    if (!inputData.content.trim()) {
      toast.error("내용을 입력해주세요");
      return false;
    }
    return true;
  }

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputData()) return;

    await axios
      .post(PostServerApi.CREATE, inputData, { headers: createAuthHeader() })
      .then((response) => {
        toast.success(response.data);
        navigate(PostClientApi.HOME);
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            제목
          </label>
          <input
            type="text"
            name="title"
            placeholder="제목"
            onChange={inputTitleHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-semibold mb-2"
          >
            게시글
          </label>
          <textarea
            name="content"
            placeholder="게시글을 입력하세요"
            onChange={inputContentHandler}
            className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          게시글 등록
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
