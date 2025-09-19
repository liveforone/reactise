export const PostClientApi = {
  HOME: "/posts", //query: lastId
  CREATE: "/posts/create",
  DETAIL: "/posts/", //param : id
  SEARCH: "/posts/search", //query: keyword & lastId
  UPDATE: "/posts/update/", //[PATCH] param : id
  BELONG_WRITER: "/posts/belong-writer/", //param : writerId
} as const;
