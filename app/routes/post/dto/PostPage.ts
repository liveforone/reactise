import type { PostSummary } from "./PostSummary";

export interface PostPageDto {
  readonly postSummaries: PostSummary[];
  readonly metadata: {
    readonly lastId: bigint;
  };
}
