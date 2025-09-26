import { TextField } from "@mui/material";
const textFieldSlotProps = {
  input: {
    sx: {
      color: "#fff",
    },
  },
  inputLabel: {
    sx: {
      color: "#BCBDBF",
      "&.Mui-focused": {
        color: "#BCBDBF", 
      },
    },
  },
  root: {
    sx: {
      backgroundColor:"inherit",
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#A6A6A6",
        },
        "& fieldset": {
          borderColor: "#A6A6A6",
        },
      },
    },
  },
};
export default function InputField({type, label, isRequired = false }) {
  return (
    <TextField
      {...(isRequired ? { required: true } : {})}
      variant="outlined"
      label={label}
      type={type}
      slotProps={textFieldSlotProps}
      autoComplete={`new-${type}`}
      sx={{width:"80%"}}
    />
  );
}
