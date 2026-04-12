import { useCallback } from "react";
import { modal } from "../../../../constant/text/vi/modal";
import { useNotify } from "../../../../hooks/useNotify";
import { useSafeRequest } from "../../../../hooks/useSafeRequest";
import { postService } from "../../services";
import { postByIdActions, loadingAction } from "../../store/actions";
import { postByIdModel } from "../../store/models/postById.model";

const resolveDetailContent = (data) => {
  if (data?.content && typeof data.content === "object") {
    return data.content;
  }

  return data ?? null;
};

export function useGetPostDetail(dispatch){
  const runRequest = useSafeRequest()
  const notify = useNotify()

  const getPostDetail = useCallback(async (contentId) => {
    if (!contentId) return null

    const r = await runRequest(
      (signal) => notify.withLoading(
        () => postService.getPostDetail(contentId, signal),
        (bool) => dispatch(loadingAction.getDetailPostLoading(bool))
      )
    )
    
    if (!r) return null

    if (r.success) {
      const content = resolveDetailContent(r.data)

      if (!content) {
        notify.popup(modal.title.error, "Can not resolve post detail")
        return r
      }

      const post = postByIdModel(content)
      dispatch(postByIdActions.addPost(post))

      return {
        ...r,
        data: {
          ...(r.data || {}),
          content: post
        }
      }
    }

    notify.popup(modal.title.error, r.message)
    return r
  },[dispatch, notify, runRequest])

  return getPostDetail
}
