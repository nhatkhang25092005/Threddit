import Column from "../../../components/layout/Column";
import { Button, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { TITLE, TEXT } from "../../../constant";
import { useState, useEffect } from "react";
import LoadingScreen from "../../../components/common/LoadingScreen";
import useVerify from "../hooks/useVerify";
import { DISPLAY } from "../../../constant";
import PopupNotification from "../../../components/common/PopupNotification";

export default function Verify() {
  // elements of verify feature
  const { verify, loading, result } = useVerify();

  //form controller
  const [otp, setOtp] = useState("");
  function handleChange(newValue) {
    const onlyDigits = newValue.replace(/[^0-9]/g, "");
    setOtp(onlyDigits);
  }
 // modal controller (like your original code)
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (result?.type === DISPLAY.POPUP) {
      setPopup(true);
    }
  }, [result]);

  return (
    <>
      <LoadingScreen control={loading} />
      <PopupNotification open = {popup} onClose = {()=>{result.fallback ? result.fallback() : setPopup(false)}} title={result?.title} content={result?.message} />
      <Column>
        <Typography variant="title" sx={{ mb: "1rem" }}>
          {TITLE.VALIDATION}
        </Typography>
        <Typography mb={"1rem"}>{TEXT.VERIFY_REGISTER_REQUEST}</Typography>
        <MuiOtpInput
          TextFieldsProps={{
            type: "tel",
            slotProps: {
              input: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                onKeyDown: (e) => {
                  if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",].includes(e.key)) {return} 
                  else if (!/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                },
              },
            },
            sx: {
              width: "50px",
              height: "50px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#7a7a7aff" },
                "&.Mui-focused fieldset": { borderColor: "#fff837ff" },
              },
              input: {
                color: "#fff",
                textAlign: "center",
              },
            },
          }}
          length={6}
          value={otp}
          onChange={handleChange}
          width={"fit-content"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Typography variant="caption" sx={{ mt: "1rem", color: "error.main" }}>
          {result?.type === DISPLAY.MAGIC ? result.message : ""}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: "2rem" }}
          onClick={() => verify(otp)}
        >
          {TEXT.SEND_VERIFY}
        </Button>
      </Column>
    </>
  );
}
