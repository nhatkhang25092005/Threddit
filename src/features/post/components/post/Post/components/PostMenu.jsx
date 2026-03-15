import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { CircularProgress } from '@mui/material'
import ButtonMenu from "../../../../../../components/common/button/ButtonMenu"
import { post } from "../../../../../../constant/text/vi/post/post"
import useAuth from "../../../../../../core/auth/useAuth"
import { usePostContext } from "../../../../hooks"
import { resolvePinOption } from "../../../../utils/resolvePinOption"

export default function PostMenu({ postId, postContext }) {
  const {
    actions: {
      deletePost,
      pinPost,
      savePost,
      unpinPost,
      unsavePost
    },
    selector: {
      post: {
        getDeleteLoadingByPostIdOf,
        getPostById,
        getPostPinLoadingOf,
        getPostPinStatusOf,
        getSaveLoadingByPostIdOf,
        getSaveStatusByPostIdOf
      }
    }
  } = usePostContext()
  const { isOwner, isOwnerByUsername } = useAuth()

  const postItem = getPostById(postId)
  const isSaved = getSaveStatusByPostIdOf(postId)
  const isSaveLoading = getSaveLoadingByPostIdOf(postId)
  const isPinned = getPostPinStatusOf(postId)
  const isPinnedLoading = getPostPinLoadingOf(postId)
  const isDeleteLoading = getDeleteLoadingByPostIdOf(postId)
  const canDelete = Boolean(postItem?.isOwner || isOwnerByUsername(postItem?.author?.username))

  const saveAction = isSaved
    ? {
        label: isSaveLoading ? <CircularProgress size={20} color="inherit" /> : post.unsavePost,
        callback: () => unsavePost(postId),
        disabled: isSaveLoading || isDeleteLoading
      }
    : {
        label: isSaveLoading
          ? <CircularProgress size={20} color="inherit" sx={{ height: "fit-content" }} />
          : post.savePost,
        callback: () => savePost(postId),
        disabled: isSaveLoading || isDeleteLoading
      }

  const pinAction = isPinned
    ? {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit" /> : 'Hủy ghim bài viết',
        callback: () => unpinPost(postId),
        disabled: isPinnedLoading || isDeleteLoading
      }
    : {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit" /> : 'Ghim bài viết',
        callback: () => pinPost(postId),
        disabled: isPinnedLoading || isDeleteLoading
      }

  const deleteAction = {
    label: isDeleteLoading ? <CircularProgress size={20} color="inherit" /> : 'Xóa bài viết',
    callback: () => deletePost(postId),
    disabled: isDeleteLoading || isPinnedLoading || isSaveLoading
  }

  const actions = [
    saveAction,
    ...(resolvePinOption(isOwner, postContext) ? [pinAction] : []),
    ...(canDelete ? [deleteAction] : [])
  ]

  return (
    <ButtonMenu
      label={
        <MoreHorizIcon
          sx={{
            color: (t) => (t.palette.mode === "dark" ? "white" : "black"),
            margin: "0px",
            width: "2rem",
          }}
        />
      }
      buttonSx={{
        bgcolor: "transparent",
        boxShadow: "none",
        borderRadius: 999,
        width: "1rem",
      }}
      buttonDisabled={isSaveLoading || isPinnedLoading || isDeleteLoading}
      actions={actions}
    />
  )
}
