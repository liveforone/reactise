import { useEffect, useState } from "react";
import axios from "axios";
import type { PostPageDto } from "./dto/PostPage";
import { PostServerApi } from "../api/PostServerApi";
import { getUserId } from "../auth/GetToken";
import { createAuthHeader } from "../util/HeaderUtil";
import { axiosErrorHandle } from "../error/AxiosErrorHandle";
import { useNavigate } from "react-router";
import { PostClientApi } from "../api/PostClientApi";
import type { PostSummary } from "./dto/PostSummary";

const PostBelongWriter = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostPageDto>({
    postSummaries: [],
    metadata: { lastId: BigInt(0) },
  });
  const [lastId, setLastId] = useState<bigint>(BigInt(0));

  const getPostPage = async (lastId: bigint = BigInt(0)) => {
    try {
      const response = await axios.get<PostPageDto>(
        PostServerApi.BELONG_WRITER,
        {
          params: { "writer-id": getUserId(), "last-id": lastId },
          headers: createAuthHeader(),
        }
      );

      const newData = response.data;
      const existingIds = new Set(postList.postSummaries.map((p) => p.id));
      const filteredNewData = newData.postSummaries.filter(
        (newPost) => !existingIds.has(newPost.id)
      );

      setPostList(
        postList
          ? {
              ...postList,
              postSummaries: [...postList.postSummaries, ...filteredNewData],
            }
          : newData
      );
      setLastId(response.data.metadata.lastId);
    } catch (error: any) {
      axiosErrorHandle(error);
    }
  };

  useEffect(() => {
    getPostPage();
  }, []);

  const handlePostClick = (id: bigint) => {
    navigate(PostClientApi.DETAIL + id);
  };

  const handleLoadMore = async () => {
    getPostPage(lastId);
  };

  return (
    <div className="flex flex-col items-center p-5">
      {postList.postSummaries.length === 0 && (
        <div className="text-gray-600">게시글이 없습니다.</div>
      )}

      {postList.postSummaries.length > 0 &&
        postList.postSummaries.map((data: PostSummary) => (
          <div
            key={data.id.toString()}
            onClick={() => handlePostClick(data.id)}
            className="bg-white rounded-lg shadow-md p-5 mb-5 w-full max-w-2xl cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
            <div className="flex justify-between text-sm text-gray-500">
              <span>작성자: {data.writer_id}</span>
              <span>{new Date(data.created_date).toLocaleString()}</span>
            </div>
          </div>
        ))}

      {lastId > BigInt(0) && (
        <button
          onClick={handleLoadMore}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-lg mt-4 hover:bg-blue-700 transition-colors"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostBelongWriter;
