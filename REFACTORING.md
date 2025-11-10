- 외부 api 호출을 [tan stack query](https://tanstack.com/query/latest)를 사용하여 진행하기. 공부필요

---

- 로딩개선

```ts
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get<PostPageDto>(...);
      setPostList(res.data);
    } catch (err: any) {
      setError("데이터를 불러오는데 실패했습니다.");
      axiosErrorHandle(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
{loading && <div>로딩중...</div>}
{error && <div className="text-red-500">{error}</div>}
```

- 이런식으로 로딩중인상태에서 데이터가 없을때 데이터 없음 에러가 발생하지 않도록 처리하고, 진짜 데이터가 없으면 그때 에러 발생하도록 변경

---

- axioserrorhandle
  - window.location.replace 부분은 비효율적이므로

```ts
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate(0); // 현재 페이지 강제 reload (SPA 방식)
```

- 로 바꿔 쓰기
- 에러 발생시 자동로그아웃과 로그인페이지로 리다이렉트 되도록 하기.

```ts
const axiosErrorHandle = (error: any, navigate?: ReturnType<typeof useNavigate>) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      navigate?.("/login", { replace: true });
    }
  }
  console.error(error);
};
// 컴포넌트에서 아래와 같이 사용
catch (error) {
  axiosErrorHandle(error, navigate);
}
```

## 공용 배너

- 배너 디자인을 전체 페이지에서 재활용 할 수 있도록 수정하라.
