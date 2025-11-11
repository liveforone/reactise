import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { UsersServerApi } from "../api/UsersServerApi";
import { createAuthHeader } from "../util/HeaderUtil";
import { Link, useNavigate } from "react-router";
import { UsersClientApi } from "../api/UsersClientApi";
import { PostClientApi } from "../api/PostClientApi";
import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import { validateTokenError } from "../error/ValidateTokenErrorHandle";

interface UsersInfo {
  id: string;
  username: string;
  role: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<UsersInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get<UsersInfo>(UsersServerApi.PROFILE, {
          headers: createAuthHeader(),
        });
        setProfileData(response.data);
      } catch (error: any) {
        validateTokenError(error, navigate);
        toast.error("회원 정보를 불러오는데 실패했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <SyncLoader size={15} color="black" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default Profile;
