# Managing JWT tokens in a real-world project

## process

> For request URLs and base URLs, you can use the domain’s home URL.

- The server must allow CORS.
- The server must set `Access-Control-Allow-Credentials` to `true`.
- Wildcards are not allowed in `Access-Control-Allow-Origin`.
- Wildcards are not allowed in `Access-Control-Allow-Methods`.
- Wildcards are not allowed in `Access-Control-Allow-Headers`.
- In Spring, it is configured as follows:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        	.allowedOrigins("http://localhost:8080", "http://localhost:8081") // Allowed origins
            .allowedMethods("GET", "POST") // Allowed HTTP methods
            .allowCredentials(true) // Allow cookie-based authentication requests
            .maxAge(3000) // Cache pre-flight requests for the desired duration
    }
}
```

- In the case of NestJS, it is as follows:

```typescript
app.enableCors({
  origin: "http://frontend-url.com",
  credentials: true,
});
```

- The server sends the access token in the **response body**.
- The refresh token is sent in an **HTTP-only secure cookie**.
- On the client, set `withCredentials: true` for Axios when making a login request.
- If using `fetch`, set the option to `include`.
- The client stores the access token in **local storage**.
- The refresh token is stored automatically by the browser.
- The refresh token is sent via cookie, and if the server returns a 401 error, the refresh token from the cookie is used to reissue a new access token.
- The reissuance logic uses an **Axios interceptor**.

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true, // Required to send the refresh token via cookie
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // The refresh token is sent automatically via cookie.
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        localStorage.setItem("access_token", data.accessToken);

        // Update the `Authorization` header with the new token and retry the request.
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If the refresh token has also expired → log the user out.
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);
```

- On the server, the refresh token is retrieved from the cookie to reissue a new access token, if it has expired, an error code is returned.

## How to properly send cookies from the server

- In the CORS settings, you need to configure `config.addExposedHeader("Set-Cookie")`.

## Since the server and frontend are on different origins, the cookie will not be recognized.

- **First-party cookie**
  - A cookie issued by the site the user is visiting.

- **Third-party cookie**
  - A cookie issued by a different domain than the one in the header.

- **Including requests with third-party cookies is controlled by the `SameSite` option:**
  - `None`: First-party and third-party cookies are sent with all requests.
  - `Lax`: Third-party cookies are sent only via links (`<a>` tags) or `window.location` navigation.
  - `Strict`: Third-party cookies are not sent with any requests.

- **Conclusion:** Set `SameSite` to `None`.

## Setting the `SameSite` option in Spring

- It can be set using `ResponseCookie` or `HttpServletResponse`’s `setHeader`.
- In Spring, it is configured as follows:

```java
httpServletResponse.setHeader("Set-Cookie", "refreshToken=" + refreshToken + "; Path=/; HttpOnly; SameSite=None; Secure; expires=" + date);
```

- In NestJS, it is as follows:

````typescript
res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
});
```

- To use `SameSite=None`, the `Secure` option must be enabled.
- This option allows cookies to be set only over HTTPS requests.
- As a result, cookies can only be sent from an HTTPS server.


````
