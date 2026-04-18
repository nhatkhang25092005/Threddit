import { Box, Button, Typography, TextField } from "@mui/material";
import LeftArrow from "../../../components/icons/LeftArrow";
import OtpInput from "../../../components/common/input/OtpInput";
import { AUTH_TEXT } from "../../../constant/text/vi/auth";
import { isOtpFilled } from "../helper/isOtpFilled";
import { keydown } from "../../../utils/keydown";
import useVerify from "./useVerify";
import { style } from "./verifyStyle";
import type { VerifyProps } from "./types/ui";

const text = AUTH_TEXT.verify
const fields = ["new_pass", "confirm"] as const

export default function Verify({ onNavigate, email }: VerifyProps) {
  const { form, onChange, submit, loading, helperText } = useVerify(onNavigate, email)

  return (
    <Box sx={style.container}>
      <LeftArrow onClick={() => onNavigate("login")} sx={style.arrow} />

      <Typography variant="title" sx={style.title}>
        {text.title}
      </Typography>

      <Typography>{text.description}</Typography>

      <OtpInput
        otp={form.otp}
        onChange={onChange}
        onKeyDown={keydown.enter(submit, { preventDefault: true })}
      />

      {fields.map((field) => (
        <TextField
          key={field}
          type="password"
          variant="standard"
          label={text.label[field]}
          name={text.name[field]}
          onChange={onChange}
          value={form[text.name[field]]}
          error={Boolean(helperText?.[field])}
          helperText={helperText?.[field] ?? null}
        />
      ))}

      <Button
        disabled={!isOtpFilled(form.otp)}
        onClick={submit}
        variant="primary"
        sx={style.button}
      >
        {loading ? "\u00A0" : text.submit}
      </Button>
    </Box>
  )
}
