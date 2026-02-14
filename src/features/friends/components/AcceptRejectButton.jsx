import {Button} from '@mui/material'
import { friend } from "../../../constant/text/vi/friend.text";
import { routes } from '../../../constant/routes'
import { useNavigate } from 'react-router-dom';
export default function AcceptRejectButton(){
  const navigate = useNavigate();
  return(
    <Button
      size="small"
      variant='outline'
      sx={{
        my: "auto",
        height: "fit-content",
        textTransform: "none",
        py: 0,
        px: 2,
        maxWidth: "100%",
        width: "auto",
        ml: 1,
        minWidth: "unset",
        whiteSpace: "nowrap",
        alignItems: "center",
        borderRadius: 999,
        "&:hover": {
          backgroundColor: "action.hover",
        }
      }}
      onClick={() => navigate(`${routes.profile}?tab=friends&friend_tab=requests_received`)}
      >
      {friend.text_on_profile.status.pending_received}
    </Button>
  )
}