import { useMemo } from "react";
import { usePostContext } from "../../../../hooks";

export function useDetailPostModalData(postId) {
  const {
    selector: {
      post: { getPostById },
    },
  } = usePostContext();
  const post = getPostById(postId);

  return useMemo(() => post, [post]);
}
