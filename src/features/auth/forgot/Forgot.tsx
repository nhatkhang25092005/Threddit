import { Box, Typography, TextField, Button } from "@mui/material";
import LeftArrow from "../../../components/icons/LeftArrow";
import { AUTH_TEXT } from "../../../constant/text/vi/auth";
import { forgotStyles } from "./forgotStyles";
import { useForgot } from "./useForgot";
import type { ForgotProps } from "./types/ui";

export default function Forgot({ onNavigate }: ForgotProps) {
  const { form, onChange, loading, helperText, onSubmit } = useForgot(onNavigate)

  return (
    <Box sx={forgotStyles.container}>
      <LeftArrow onClick={() => onNavigate("login")} sx={forgotStyles.icon} />
      <Typography variant="title" sx={forgotStyles.title}>
        {AUTH_TEXT.forgot.title}
      </Typography>
      <Typography variant="normal" sx={forgotStyles.message}>
        {AUTH_TEXT.forgot.message}
      </Typography>
      <TextField
        variant="standard"
        label={AUTH_TEXT.forgot.email_field}
        value={form.email}
        onChange={onChange}
        helperText={helperText}
        error={Boolean(helperText)}
        name="email"
      />
      <Button
        disabled={form.email === ""}
        loading={loading}
        variant="primary"
        onClick={onSubmit}
        sx={forgotStyles.button}
      >
        {loading ? "\u00A0" : AUTH_TEXT.forgot.submit}
      </Button>
    </Box>
  )
}
