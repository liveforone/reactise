# 실 프로젝트에서 JWT 토큰 관리

## 흐름

> 요청 url/base url 등은 도메인 home url을 넣으면 된다.

- 서버는 cors를 허용해야한다.
- 서버는 Access-Control-Allow-Credentials을 true로 설정해야한다.
- 서버는 Access-Control-Allow-Origin 에 와일드카드 사용 금지.
- 서버는 Access-Control-Allow-Methods 에 와일드카드 사용 금지.
- 서버는 Access-Control-Allow-Headers 에 와일드카드 사용 금지.
- spring의 경우 아래와 같다.

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        	.allowedOrigins("http://localhost:8080", "http://localhost:8081") // 허용할 출처
            .allowedMethods("GET", "POST") // 허용할 HTTP method
            .allowCredentials(true) // 쿠키 인증 요청 허용
            .maxAge(3000) // 원하는 시간만큼 pre-flight 리퀘스트를 캐싱
    }
}
```

- nestjs의 경우 아래와 같다.

```typescript
app.enableCors({
  origin: "http://frontend-url.com",
  credentials: true,
});
```

- server -> response body 에 access token을 넣어 전달.
- http only secure cookie에 refresh token을 넣어 전달.
- 클라이언트는 로그인 요청시 axios에는 withCredentials을 true로
- fetch를 사용할 경우 include로 옵션을 허용한다.
- 클라이언트는 local storage에 access token을 저장한다.
- refresh token은 브라우저가 자동으로 저장한다.
- refresh token은 쿠키로 날라오고 만약 서버에서 401 에러가 발생하면 쿠키의 refresh token을 활용해서 재발급 한다.
- 재발급 로직은 axios interceptor를 활용한다.

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true, // refresh token 쿠키 전송을 위해 필요
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token은 쿠키로 자동 전송됨
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("access_token", data.accessToken);

        // 새 토큰으로 Authorization 헤더 갱신 후 재요청
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // refresh token도 만료됨 → 로그아웃 처리
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);
```

- 서버에서는 쿠키에서 refresh 토큰을 꺼내서 재발급하고, 만일 만료되었다면 다시 에러 코드를 보내준다.

## 서버에서 정상적으로 쿠키를 보내는법

- cors 설정에서 `config.addExposedHeader("Set-Cookie")` 설정을 해야한다.

## 서버와 프론트의 위치가 달라 쿠키가 인식을 못할 것이다.

- 퍼스트파티 쿠키
  - 방문한 사이트에서 발행한 쿠키를 의미한다.
- 서드파티 쿠키
  - 헤더와 쿠키가 발행한 곳이 다를때를 의미한다.
- 서드파티 쿠키에 요청을 포함하는 것이 SameSite 옵션이다.
  - None : 모든 요청에 퍼스트파티, 서드파티 쿠키가 전송된다.
  - Lax : 서드파티 쿠키는 a tag를 이용한 전달, `window.location`등으로만 전달된다.
  - strict : 모든 요청에 서드파티 쿠키가 전달되지 않는다.
  - 결론적으로 SameSite None으로 설정해야한다.

## 스프링에서 SameSite옵션 설정

- ResponseCookie 또는 HttpServletResponse 의 setHeader로 설정가능하다.
- spring에서는 아래와 같다.

```java
httpServletResponse.setHeader("Set-Cookie", "refreshToken=" + refreshToken + "; Path=/; HttpOnly; SameSite=None; Secure; expires=" + date);
```

- nestjs에는 아래와 같다.

````typescript
res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
});
```

- SameSite None을 이용하려면 Secure옵션을 사용해야한다.
- https 요청에만 쿠키를 설정하는 옵션이다.
- 이렇게 되면 https 서버에서만 쿠키를 보낼 수 있다.

````
