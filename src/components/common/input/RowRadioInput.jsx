import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioInput({sx,onKeyDown, label, name, value, fields = [{value:null, label:null}], onChange}) {
  return (
    <FormControl sx={sx}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        onKeyDown={onKeyDown}
        onChange={onChange}
        name={name}
        value={value}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
      >
        {fields.map(field=>
          <FormControlLabel
            key={field.value}
            value={field.value}
            control={<Radio/>}
            checked = {value === field.value}
            label={field.label}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem', // 14px
              },
            }}
            />
          )
        }
      </RadioGroup>
    </FormControl>
  );
}