import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/users/login", "routes/account/Login.tsx"),
  route("/users/logout", "routes/account/Logout.tsx"),
  route("/users/withdraw", "routes/account/Withdraw.tsx"),
  route("/users/signup", "routes/users/Signup.tsx"),
  route("/users/profile", "routes/users/Profile.tsx"),
  route("/users/update/password", "routes/users/UpdatePassword.tsx"),
  route("/posts", "routes/post/PostHome.tsx"),
  route("/posts/create", "routes/post/CreatePost.tsx"),
  route("/posts/:id", "routes/post/PostDetail.tsx"),
  route("/posts/update/:id", "routes/post/UpdatePost.tsx"),
  route("/posts/belong-writer/:writerId", "routes/post/PostBelongWriter.tsx"),
] satisfies RouteConfig;
