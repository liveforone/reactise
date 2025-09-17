import { Link } from "react-router";
import { getAccessToken } from "./auth/GetToken";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { PostClientApi } from "./post/api/PostClientApi";
import { UsersClientApi } from "./users/api/UsersClientApi";

const Home = () => {
  const accessToken = getAccessToken();

  return (
    <div>
      {/* 헤더 */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-gray-800">MyApp</div>
        <div className="flex space-x-8">
          <Link
            to={PostClientApi.HOME}
            className="text-lg text-gray-800 font-bold"
          >
            게시글
          </Link>
          <Link to="/category2" className="text-lg text-gray-800 font-bold">
            category2
          </Link>
          <Link to="/category3" className="text-lg text-gray-800 font-bold">
            category3
          </Link>
          <Link to="/category4" className="text-lg text-gray-800 font-bold">
            category4
          </Link>
          <Link to="/category5" className="text-lg text-gray-800 font-bold">
            category5
          </Link>
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

      {/* 메인 컨텐츠 */}
      <main className="text-center p-12">
        <h1 className="text-4xl mb-5">Landing Page</h1>
        <p className="text-2xl text-gray-600 mb-7">부제</p>
        <p className="text-lg mb-7">상세 설명</p>
      </main>
    </div>
  );
};

export default Home;
