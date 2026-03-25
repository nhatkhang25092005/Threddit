import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { CircularProgress } from '@mui/material'
import ButtonMenu from "../../../../../../components/common/button/ButtonMenu"
import { post } from "../../../../../../constant/text/vi/post/post"
import useAuth from "../../../../../../core/auth/useAuth"
import { usePostContext } from "../../../../hooks"
import { usePostModal } from "../../../../provider/usePostModal"
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
      loading: {
        getEditPostLoading
      },
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
  const { openModal } = usePostModal()

  const postItem = getPostById(postId)
  const isSaved = getSaveStatusByPostIdOf(postId)
  const isSaveLoading = getSaveLoadingByPostIdOf(postId)
  const isPinned = getPostPinStatusOf(postId)
  const isPinnedLoading = getPostPinLoadingOf(postId)
  const isDeleteLoading = getDeleteLoadingByPostIdOf(postId)
  const isEditLoading = getEditPostLoading()
  const canDelete = Boolean(postItem?.isOwner || isOwnerByUsername(postItem?.author?.username))
  const canEdit = canDelete
  const canPin = resolvePinOption(isOwner, postContext)
    || Boolean(postContext === "detailPostPage" && canDelete)

  const saveAction = isSaved
    ? {
        label: isSaveLoading ? <CircularProgress size={20} color="inherit" /> : post.unsavePost,
        callback: () => unsavePost(postId),
        disabled: isSaveLoading || isDeleteLoading || isEditLoading
      }
    : {
        label: isSaveLoading
          ? <CircularProgress size={20} color="inherit" sx={{ height: "fit-content" }} />
          : post.savePost,
        callback: () => savePost(postId),
        disabled: isSaveLoading || isDeleteLoading || isEditLoading
      }

  const pinAction = isPinned
    ? {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit" /> : post.menu.unpin,
        callback: () => unpinPost(postId),
        disabled: isPinnedLoading || isDeleteLoading || isEditLoading
      }
    : {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit" /> : post.menu.pin,
        callback: () => pinPost(postId),
        disabled: isPinnedLoading || isDeleteLoading || isEditLoading
      }

  const editAction = {
    label: isEditLoading ? <CircularProgress size={20} color="inherit" /> : post.menu.edit,
    callback: () => openModal("edit_post_modal", { postId }),
    disabled: isDeleteLoading || isPinnedLoading || isSaveLoading || isEditLoading
  }

  const deleteAction = {
    label: isDeleteLoading ? <CircularProgress size={20} color="inherit" /> : post.menu.delete,
    callback: () => deletePost(postId),
    disabled: isDeleteLoading || isPinnedLoading || isSaveLoading || isEditLoading
  }

  const actions = [
    saveAction,
    ...(canPin ? [pinAction] : []),
    ...(canEdit ? [editAction] : []),
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
        minWidth: "unset",
        width: "2.4rem",
        height: "2.4rem",
        p: 0,
        zIndex: 1,
        "&:hover": {
          bgcolor: (t) => (t.palette.mode === "dark" ? "#131F31" : "#EEF2F6"),
          boxShadow: "none",
        },
      }}
      buttonDisabled={isSaveLoading || isPinnedLoading || isDeleteLoading || isEditLoading}
      actions={actions}
    />
  )
}
