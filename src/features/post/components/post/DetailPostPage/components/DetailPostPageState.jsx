import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { detailPostPage } from "../../../../../../constant/text/vi/post/detailpostpage.text";
import { style } from "../style";

const sx = style.page;

export default function DetailPostPageState({
  description,
  loading = false,
  onBack,
  title,
}) {
  return (
    <Box sx={sx.stateRoot}>
      <Box sx={sx.stateCard}>
        {loading ? <CircularProgress size={32} sx={sx.stateSpinner} /> : null}

        <Typography sx={sx.stateTitle}>{title}</Typography>
        <Typography sx={sx.stateDescription}>{description}</Typography>

        <Button
          onClick={onBack}
          startIcon={<ArrowBackRoundedIcon />}
          sx={sx.stateButton}
          variant="secondary"
        >
          {detailPostPage.backLabel}
        </Button>
      </Box>
    </Box>
  );
}
