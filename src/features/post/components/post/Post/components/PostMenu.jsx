import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {CircularProgress} from '@mui/material'
import ButtonMenu from "../../../../../../components/common/button/ButtonMenu"
import { usePostContext } from "../../../../hooks"
import { post } from "../../../../../../constant/text/vi/post/post";

export default function PostMenu({ postId }) {
  const {
    actions: {
      savePost,
      unsavePost,
      pinPost,
      unpinPost
    },
    selector:{
      post:{
        getSaveStatusByPostIdOf,
        getSaveLoadingByPostIdOf,
        getPostPinStatusOf,
        getPostPinLoadingOf
      }
    }
  } = usePostContext()

  const isSaved = getSaveStatusByPostIdOf(postId)
  const isSaveLoading = getSaveLoadingByPostIdOf(postId)
  const isPinned = getPostPinStatusOf(postId)
  const isPinnedLoading = getPostPinLoadingOf(postId)

  const saveAction = isSaved
    ? {
        label: isSaveLoading ? <CircularProgress/>: post.unsavePost,
        callback: () => unsavePost(postId),
        disabled: isSaveLoading
      }
    : {
        label: isSaveLoading ? <CircularProgress sx={{height:"fit-content"}}/> : post.savePost,
        callback: () => savePost(postId),
        disabled: isSaveLoading
      }

  const pinActions = isPinned
    ? {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit"/> : 'Hủy ghim bài viết',
        callback: () => unpinPost(postId),
        disabled:isPinnedLoading
      }
    : {
        label: isPinnedLoading ? <CircularProgress size={20} color="inherit"/> : 'Ghim bài viết',
        callback: () => pinPost(postId),
        disabled:isPinnedLoading
      }

  const actions = [
    saveAction,
    pinActions
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
      buttonDisabled={isSaveLoading}
      actions={actions}
    />
  )
}
