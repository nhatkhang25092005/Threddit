import { Typography } from "@mui/material";
import Surface from "../../../../../components/common/Surface";
import { style } from "../style";

const resolveTitle = (status) => {
  if (status === "error") return "Khong tai duoc reel"
  return "Chua co reel de hien thi"
}

export default function ReelEmpty({ message, status = "empty" }) {
  return (
    <Surface sx={style.emptyCard} variant="card">
      <Typography sx={style.emptyTitle}>
        {resolveTitle(status)}
      </Typography>
      <Typography sx={style.emptyText}>
        {message || "UI da goi request tu useGetReel.js, nhung chua co du lieu hop le de render danh sach reel."}
      </Typography>
    </Surface>
  )
}
