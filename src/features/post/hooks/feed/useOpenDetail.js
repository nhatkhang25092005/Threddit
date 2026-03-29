import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { usePostModal } from '../../provider/usePostModal'

const resolveBooleanSearchParam = (value) => (
  value === "true" || value === "1"
)

const getSearchParams = (searchParams) => {
  const contentId = searchParams.get('contentId') || null
  const commentId = searchParams.get('commentId') || null
  const isSubComment = resolveBooleanSearchParam(searchParams.get('isSubComment'))
  
  return [contentId, commentId, isSubComment]
}

const buildDetailModalProps = (contentId, commentId, isSubComment) => ({
  postId: contentId,
  ...(commentId != null ? { commentId } : {}),
  ...(isSubComment ? { isSubComment: true } : {}),
})

export function useOpenDetail(){
  const [searchParams, setSearchParams] = useSearchParams()
  const { openModal } = usePostModal()
  const [contentId, commentId, isSubComment] = getSearchParams(searchParams)
  const handledParamsRef = useRef(null)

  useEffect(()=>{
    if (contentId == null) {
      handledParamsRef.current = null
      return
    }

    const handledKey = `${contentId}:${commentId ?? ''}:${isSubComment ? 'sub' : 'root'}`
    if (handledParamsRef.current === handledKey) {
      return
    }

    handledParamsRef.current = handledKey
    openModal('detail_post_modal', buildDetailModalProps(contentId, commentId, isSubComment))

    const nextSearchParams = new URLSearchParams(searchParams)
    nextSearchParams.delete('contentId')
    nextSearchParams.delete('commentId')
    nextSearchParams.delete('isSubComment')
    setSearchParams(nextSearchParams, { replace: true })
  },[commentId, contentId, isSubComment, openModal, searchParams, setSearchParams])


}
