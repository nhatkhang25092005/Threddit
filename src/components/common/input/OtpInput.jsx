import { MuiOtpInput } from "mui-one-time-password-input"
import { useThemeContext } from "../../../theme/ThemeContext"
export default function OtpInput({otp, onChange, onKeyDown}){
  const {mode} = useThemeContext()
  const color = mode === 'light' ? '#000' : '#fff'
  const focus = mode === 'light' ? "green" : "#fff837ff"
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
            "&:hover fieldset": { borderColor: "#7a7a7aff" },
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