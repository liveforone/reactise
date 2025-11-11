import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { PostPageDto } from "./dto/PostPage";
import { PostServerApi } from "../api/PostServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { validateTokenError } from "../error/ValidateTokenErrorHandle";
import { PostClientApi } from "../api/PostClientApi";
import {
  ArrowLeftStartOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { getAccessToken } from "../auth/GetToken";
import { Link, useNavigate } from "react-router";
import { UsersClientApi } from "../api/UsersClientApi";
import SyncLoader from "react-spinners/SyncLoader";

const PostHome = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState<PostPageDto>({
    postSummaries: [],
    metadata: { lastId: BigInt(0) },
  });
  const [lastId, setLastId] = useState<bigint>(BigInt(0));

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const getPostPage = async (lastId: bigint = BigInt(0)) => {
    setLoading(true);
    try {
      const response = await axios.get<PostPageDto>(PostServerApi.HOME, {
        params: { "last-id": lastId },
        headers: createAuthHeader(),
      });

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
      validateTokenError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  const getSearchPostPage = async (
    lastId: bigint = BigInt(0),
    query: string
  ) => {
    setLoading(true);

    try {
      const response = await axios.get<PostPageDto>(PostServerApi.SEARCH, {
        params: { keyword: query, "last-id": lastId },
        headers: createAuthHeader(),
      });

      const newData = response.data;

      if (lastId === BigInt(0)) {
        // 새로운 검색 → 덮어쓰기
        setPostList(newData);
      } else {
        // 더 불러오기 → 이어붙이기
        setPostList((prevData) => ({
          ...prevData,
          postSummaries: [...prevData?.postSummaries, ...newData.postSummaries],
          metadata: newData.metadata,
        }));
      }

      setLastId(newData.metadata.lastId);
    } catch (error: any) {
      validateTokenError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostPage();
  }, []);

  const handlePostClick = (id: bigint) => {
    navigate(PostClientApi.DETAIL + id);
  };

  const handlePostCreate = () => {
    navigate(PostClientApi.CREATE);
  };

  const handleLoadMore = async () => {
    if (isSearching) {
      await getSearchPostPage(lastId, searchQuery);
    } else {
      await getPostPage(lastId);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    setIsSearching(true); // 검색 모드 활성화
    setLastId(BigInt(0));
    getSearchPostPage(BigInt(0), searchQuery);
  };

  const accessToken = getAccessToken();

  return (
    <>
      <div>
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
          <div className="text-2xl font-bold text-gray-800">MyApp</div>
          <div className="flex space-x-8">
            <button
              onClick={handlePostCreate}
              className="px-3 py-3 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 hover:scale-105 transition-transform"
            >
              <PlusCircleIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="bg-transparent outline-none px-2 py-1 rounded-l-full"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-3 py-1 rounded-r-full hover:bg-blue-600 transition"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {accessToken == null ? (
            <div className="space-x-4">
              <Link
                to={UsersClientApi.LOGIN}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 transition-colors"
              >
                로그인
              </Link>
              <Link
                to={UsersClientApi.SIGNUP}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-gray-500 transition-colors"
              >
                회원가입
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to={UsersClientApi.PROFILE}
                className="inline-flex items-center bg-gray-700 text-white px-2 py-2 rounded text-lg mb-4 hover:bg-gray-500 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <Link
                to={UsersClientApi.LOGOUT}
                className="inline-flex items-center bg-gray-700 text-white px-2 py-2 rounded text-lg mb-4 hover:bg-gray-500 transition-colors"
              >
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
              </Link>
            </div>
          )}
        </header>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <SyncLoader size={15} color="black" />
        </div>
      ) : (
        <div className="flex flex-col items-center p-5">
          {postList.postSummaries.length === 0 && (
            <div className="text-gray-500">게시글이 없습니다.</div>
          )}

          {postList.postSummaries.length > 0 &&
            postList.postSummaries.map((data) => (
              <div
                key={data.id.toString()}
                onClick={() => handlePostClick(data.id)}
                className="bg-white shadow-md rounded-lg p-5 mb-5 w-full max-w-2xl cursor-pointer hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{`작성자: ${data.writer_id}`}</span>
                  <span>{new Date(data.created_date).toLocaleString()}</span>
                </div>
              </div>
            ))}

          {lastId > BigInt(0) && (
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg mb-5 hover:bg-blue-600 transition"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PostHome;
