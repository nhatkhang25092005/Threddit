import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import {FormControl} from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
export default function DateInput({
  label,
  value,
  onChange,
  name,
  sx
}){
  return(
    <FormControl sx={sx}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue)=>{
            onChange({
              target:{
                name,
                value:newValue ? newValue.toISOString() : ''
              }
            })
          }}
          format="DD/MM/YYYY"
          maxDate={dayjs()}
        />
      </LocalizationProvider>
    </FormControl>
  )
}