export const PostClientApi = {
  HOME: "/posts", //query: lastId
  SEARCH: "/posts/search", //query: keyword & lastId
  CREATE: "/posts/create",
  UPDATE: "/posts/update/", //[PATCH] param : id
  DETAIL: "/posts/", //param : id
  BELONG_WRITER: "/posts/belong-writer/", //param : writerId
} as const;
