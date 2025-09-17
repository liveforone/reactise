import axios from "axios";
import { useEffect, useState } from "react";
import { UsersServerApi } from "./api/UsersServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { axiosErrorHandle } from "../error/AxiosErrorHandle";
import { Link } from "react-router";
import { UsersClientApi } from "./api/UsersClientApi";
import { PostClientApi } from "../post/api/PostClientApi";

interface UsersInfo {
  id: string;
  username: string;
  role: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<UsersInfo | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      await axios
        .get<UsersInfo>(UsersServerApi.PROFILE, {
          headers: createAuthHeader(),
        })
        .then((response) => {
          setProfileData(response.data);
        })
        .catch((error: any) => {
          axiosErrorHandle(error);
        });
    };
    getProfile();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* 프로필 카드 */}
      <div className="bg-blue-200 p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        {profileData && (
          <>
            <h1 className="text-2xl font-bold mb-4">나의 정보</h1>
            <p className="text-lg mb-2">{profileData.username}</p>
            <p className="text-lg">{profileData.role}</p>
          </>
        )}
      </div>

      {/* 버튼 링크 영역 */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to={UsersClientApi.UPDAET_PASSWORD}
          className="bg-green-400 text-black px-4 py-2 rounded-md hover:bg-yellow-200 transition-colors"
        >
          비밀번호 변경
        </Link>
        <Link
          to={UsersClientApi.WITHDRAW}
          className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-yellow-200 transition-colors"
        >
          탈퇴
        </Link>
        {profileData && (
          <Link
            to={PostClientApi.BELONG_WRITER + profileData.id}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-200 transition-colors"
          >
            나의 게시글
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
