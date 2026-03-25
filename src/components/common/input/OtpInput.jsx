import { MuiOtpInput } from "mui-one-time-password-input"
import { useTheme } from "@mui/material/styles"
export default function OtpInput({otp, onChange, onKeyDown}){
  const theme = useTheme()
  const color = theme.palette.mode === 'light' ? '#000' : '#fff'
  const focus = theme.palette.mode === 'light' ? "#22C55E" : "#00F2FF"
  return(
    <MuiOtpInput
      validateChar={(char)=>/^[0-9]$/.test(char)}
      TextFieldsProps={{
        type: "tel",
        slotProps: {
          input: {
            color:'##ff',
            inputMode: "numeric",
            pattern: "[0-9]*",
            onKeyDown: (e) => {
              if (["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",].includes(e.key)) {return} 
              else if (!/^[0-9]$/.test(e.key)) {e.preventDefault()}
            },
          },
        },
        sx: {
          width: "100%",
          height: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: color },
            width:'100%',
            height:'100%',
            "&:hover fieldset": { borderColor: "#64748B" },
            "&.Mui-focused fieldset": { borderColor: focus },
          },
          input: {
            width:'100%',
            height:'100%',
            color: color,
            textAlign: "center",
            fontSize: "20px",
          },
        },
      }}
      length={6}
      value={otp}
      onKeyDown={onKeyDown}
      onChange={(newValue)=>{
        onChange({
          target:{
            name:'otp',
            value:newValue
          }})
        }}
      width={"fit-content"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    />
  )
}
