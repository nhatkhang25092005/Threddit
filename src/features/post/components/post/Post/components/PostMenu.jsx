import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {CircularProgress} from '@mui/material'
import ButtonMenu from "../../../../../../components/common/button/ButtonMenu"
import { usePostContext } from "../../../../hooks"

export default function PostMenu({ postId }) {
  const {
    actions: { savePost, unsavePost },
    selector: { post: { getSaveStatusByPostIdOf, getSaveLoadingByPostIdOf } }
  } = usePostContext()

  const isSaved = getSaveStatusByPostIdOf(postId)
  const isSaveLoading = getSaveLoadingByPostIdOf(postId)

  const saveAction = isSaved
    ? {
        label: isSaveLoading ? <CircularProgress/>: "Huy luu bai viet",
        callback: () => unsavePost(postId),
        disabled: isSaveLoading
      }
    : {
        label: isSaveLoading ? <CircularProgress sx={{height:"fit-content"}}/> : "Luu bai viet",
        callback: () => savePost(postId),
        disabled: isSaveLoading
      }

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
      actions={[saveAction]}
    />
  )
}
