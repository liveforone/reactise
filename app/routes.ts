import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";
import { UsersClientApi } from "./routes/api/UsersClientApi";
import { PostClientApi } from "./routes/api/PostClientApi";

/**
 * routing은 모두 이 파일에서 진행한다.
 * 일반적으로 컴포넌트 내에서 파라미터를 추가하여 사용하는 api와
 * 라우팅에서 사용하는 파라미터 추가 api는 표기가 다르므로
 * 그런 형태의 api 들은 routes.ts에서 상수를 사용하지 않는다.
 */

export default [
  //home
  index("routes/home.tsx"),
  ...prefix("users", [
    route("login", "routes/account/Login.tsx"),
    route("logout", "routes/account/Logout.tsx"),
    route("withdraw", "routes/account/Withdraw.tsx"),
    route("signup", "routes/users/Signup.tsx"),
    route("profile", "routes/users/Profile.tsx"),
    route("update/password", "routes/users/UpdatePassword.tsx"),
  ]),
  ...prefix("posts", [
    index("routes/post/PostHome.tsx"),
    route(":id", "routes/post/PostDetail.tsx"),
    route("create", "routes/post/CreatePost.tsx"),
    route("update/:id", "routes/post/UpdatePost.tsx"),
    route("belong-writer/:writerId", "routes/post/PostBelongWriter.tsx"),
  ]),
] satisfies RouteConfig;
