import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { UsersClientApi } from "./routes/api/UsersClientApi";
import { PostClientApi } from "./routes/api/PostClientApi";

export default [
  index("routes/home.tsx"),
  route(UsersClientApi.LOGIN, "routes/account/Login.tsx"),
  route(UsersClientApi.LOGOUT, "routes/account/Logout.tsx"),
  route(UsersClientApi.WITHDRAW, "routes/account/Withdraw.tsx"),
  route(UsersClientApi.SIGNUP, "routes/users/Signup.tsx"),
  route(UsersClientApi.PROFILE, "routes/users/Profile.tsx"),
  route(UsersClientApi.UPDAET_PASSWORD, "routes/users/UpdatePassword.tsx"),
  route(PostClientApi.HOME, "routes/post/PostHome.tsx"),
  route(PostClientApi.CREATE, "routes/post/CreatePost.tsx"),
  route("/posts/:id", "routes/post/PostDetail.tsx"),
  route("/posts/update/:id", "routes/post/UpdatePost.tsx"),
  route("/posts/belong-writer/:writerId", "routes/post/PostBelongWriter.tsx"),
] satisfies RouteConfig;
