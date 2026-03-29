import { useEffect, useMemo } from "react";
import { usePostContext } from "../../../../hooks";
import { buildDetailPostModalData } from "../utils/detailPostModal.utils";

export function useDetailPostModalData(postId) {
  const {
    actions: {
      getPostDetail,
    },
    selector: {
      post: { getPostById },
    },
  } = usePostContext();
  const post = getPostById(postId);
  const detail = useMemo(() => buildDetailPostModalData(post), [post]);

  useEffect(() => {
    if (!postId || post) {
      return;
    }

    void getPostDetail(postId);
  }, [getPostDetail, post, postId]);

  return detail;
}
