import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { getUserId } from "../auth/GetToken";
import { PostServerApi } from "../api/PostServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { PostClientApi } from "../api/PostClientApi";
import { axiosErrorHandle } from "../error/AxiosErrorHandle";
import {
  ArrowLeftCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/16/solid";
import type { PostInfo } from "./dto/PostInfo";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const statePostInfo = (location.state as { postInfo: PostInfo } | undefined)
    ?.postInfo;

  const [postInfo, setPostInfo] = useState<PostInfo | null>(
    statePostInfo || null
  );
  const [updateData, setUpdateData] = useState({
    writerId: getUserId(),
    content: statePostInfo?.content || "",
  });

  // Fallback: state가 없으면 API 호출
  useEffect(() => {
    if (!postInfo) {
      const fetchPost = async () => {
        try {
          const param = window.location.pathname.split("/").pop(); // 마지막 param 추출
          const response = await axios.get<PostInfo>(
            PostServerApi.DETAIL + param,
            {
              headers: createAuthHeader(),
            }
          );
          setPostInfo(response.data);
          setUpdateData({
            writerId: getUserId(),
            content: response.data.content || "",
          });
        } catch (error: any) {
          axiosErrorHandle(error);
        }
      };
      fetchPost();
    }
  }, [postInfo]);

  const inputContentHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUpdateData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!updateData.content.trim()) {
      toast.error("업데이트할 내용을 입력하세요");
      return;
    }
    if (!postInfo) return;
    await axios
      .patch(PostServerApi.UPDATE + postInfo.id, updateData, {
        headers: createAuthHeader(),
      })
      .then((response) => {
        toast.success(response.data);
        navigate(PostClientApi.DETAIL + postInfo.id);
      })
      .catch((error: any) => {
        axiosErrorHandle(error);
      });
  };

  if (!postInfo) return <div className="text-center mt-10">로딩중...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeftCircleIcon className="w-5 h-5" />
        이전으로
      </button>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            게시글
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="게시글을 입력하세요."
            onChange={inputContentHandler}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={5}
            value={updateData.content}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          게시글 업데이트
          <ArrowUpCircleIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
