import { MuiOtpInput } from "mui-one-time-password-input"

export default function OtpInput({otp, onChange}){
  return(
    <MuiOtpInput
      validateChar={(char)=>/^[0-9]$/.test(char)}
      TextFieldsProps={{
        type: "tel",
        slotProps: {
          input: {
            color:'#fff',
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
            "& fieldset": { borderColor: "#fff" },
            width:'100%',
            height:'100%',
            "&:hover fieldset": { borderColor: "#7a7a7aff" },
            "&.Mui-focused fieldset": { borderColor: "#fff837ff" },
          },
          input: {
            width:'100%',
            height:'100%',
            color: "#fff",
            textAlign: "center",
            fontSize: "20px",
          },
        },
      }}
      length={6}
      value={otp}
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