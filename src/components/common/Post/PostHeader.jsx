import { ROUTES, LABEL } from "../../../constant";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from "@mui/icons-material/PushPin";
import OptionsMenu from '../OptionsMenu'

const PostHeader = memo(({
  author,
  createdAt,
  isPinned,
  showPin,
  isOwner,
  loading,
  onPin,
  onDelete,
  onEdit,
}) => {
    const navigate = useNavigate();
    const handleAuthorClick = (e) => {
      e.stopPropagation();
      const route = isOwner
        ? ROUTES.USER
        : `${ROUTES.CLIENT_PAGE}/${author.username}`;
      navigate(route);
    };

    const pinOption = {
      label: isPinned ? LABEL.UNPIN : LABEL.PIN,
      icon: loading ? (<CircularProgress size={20} />) : isPinned ? (<PushPinIcon />) : (<PushPinOutlinedIcon />),
      callback: onPin,
    };

    const menuOptions = [
      { label: LABEL.DELETE, icon: <Delete />, callback: onDelete },
      { label: LABEL.EDIT, icon: <Edit />, callback: onEdit },
      pinOption,
    ];

    return(
      <Box sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        pb: "0px",
        mb: "1rem",
        py: "1rem",
        mx: "1rem"
      }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        onClick={handleAuthorClick}
        sx={{
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        {author.username}
      </Typography>
      
      <Typography variant="subtitle2" color="white">
        {createdAt}
      </Typography>
      
      {isPinned && showPin && (
        <PushPinIcon sx={{ color: "#d9ff41" }} />
      )}
      
      {isOwner && (
        <OptionsMenu
          functionList={menuOptions}
          sx={{ ml: "auto" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        />
      )}
    </Box>
    )
  }
);

PostHeader.displayName = "PostHeader";
export default PostHeader;
