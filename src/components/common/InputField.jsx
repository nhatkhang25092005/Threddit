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
      backgroundColor: "inherit",
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
export default function InputField({
  setError = false,
  helperText,
  type,
  label,
  setName,
  setValue,
  setOnChange,
  isRequired = false,
}) {
  return (
    <TextField
      {...(setName ? { name: setName } : {})}
      {...(setOnChange ? { onChange: setOnChange } : {})}
      value={setValue ?? ""}
      {...(isRequired ? { required: true } : {})}
      variant="outlined"
      label={label}
      type={type}
      slotProps={textFieldSlotProps}
      autoComplete={`new-${type}`}
      autoCorrect="off"
      error={!!setError}
      helperText={helperText}
      sx={{ width: "80%" }}
    />
  );
}
