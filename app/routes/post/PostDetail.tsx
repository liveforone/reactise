import axios from "axios";
import { useEffect, useState } from "react";
import type { PostInfo } from "./dto/PostInfo";
import { getUserId } from "../auth/GetToken";
import { getLastParam } from "../util/ParamUtil";
import { PostServerApi } from "./api/PostServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { axiosErrorHandle } from "../error/AxiosErrorHandle";
import { PostClientApi } from "./api/PostClientApi";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";

const PostDetail = () => {
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPostInfo = async () => {
      const param = getLastParam();
      await axios
        .get<PostInfo>(PostServerApi.DETAIL + param, {
          headers: createAuthHeader(),
        })
        .then((response) => {
          setPostInfo(response.data);
        })
        .catch((error: any) => {
          axiosErrorHandle(error);
        });
    };
    getPostInfo();
  }, []);

  const handleEditClick = () => {
    navigate(PostClientApi.UPDATE + postInfo?.id, { state: { postInfo } });
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");

    if (confirmDelete) {
      await axios
        .delete(PostServerApi.REMOVE + postInfo?.id, {
          data: { writerId: getUserId() },
          headers: createAuthHeader(),
        })
        .then((response) => {
          alert(response.data);
          navigate(PostClientApi.HOME);
        })
        .catch((error: any) => {
          axiosErrorHandle(error);
        });
    } else {
      alert("게시글 삭제가 취소되었습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 text-gray-800">
      {postInfo && (
        <div className="w-3/5 p-5 border border-gray-300 mb-6 bg-gray-50 rounded-lg shadow">
          <div className="mb-2 text-sm text-gray-600">
            ID: {postInfo.id.toString()}
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            {postInfo.title}
          </h2>
          <div className="text-sm text-gray-600 mb-4">
            Post State: {postInfo.post_state}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Writer: {postInfo.writer_id}</span>
            <span>
              Created Date: {new Date(postInfo.created_date).toLocaleString()}
            </span>
          </div>
          <textarea
            readOnly
            value={postInfo.content}
            className="w-full text-lg p-3 border-2 border-gray-300 rounded-lg resize-y outline-none focus:border-blue-500 bg-white text-gray-700"
          />
          {postInfo && getUserId()?.trim() === postInfo.writer_id.trim() && (
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={handleEditClick}
                className="flex items-center justify-center w-10 h-10 rounded hover:bg-blue-100 transition-colors"
              >
                <PencilSquareIcon className="w-6 h-6 text-black hover:text-blue-600" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center justify-center w-10 h-10 rounded hover:bg-red-100 transition-colors"
              >
                <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-700" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
