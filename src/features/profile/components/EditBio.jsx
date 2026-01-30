import {Typography, Box, Button, CircularProgress, MenuItem, FormControl, InputLabel, Select} from '@mui/material'
import Surface from '../../../components/common/Surface'
import SchoolIcon from '@mui/icons-material/School';
import { style } from '../style'
import { profile } from '../../../constant/text/vi/profile.text'
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import TransgenderSharpIcon from '@mui/icons-material/TransgenderSharp';
import RowRadioInput from '../../../components/common/input/RowRadioInput';
import PeopleIcon from '@mui/icons-material/People';
import { useProfileContext } from '../hooks';
import { useInput } from '../../../hooks/useInput';
import DateInput from '../../../components/common/input/DateInput';

function useEditBio(initForm){
  const [form, onChange] = useInput({
    gender:initForm.gender,
    birth:initForm.dateOfBirth,
    educationalLevel:initForm.educationalLevel,
    relationshipStatus:initForm.relationshipStatus
  })

  return { form, onChange }
}

function SelectInput({label, name, value, onChange, list}){
  return(
    <Box sx={{width:'100%'}}>
      <FormControl fullWidth >
        <InputLabel>{label}</InputLabel>
        <Select MenuProps={{disablePortal: true}} name={name} label={label} value={value} onChange={onChange}>
          {list.map(item=>(
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

const sx = style.modal.edit_bio
const text = profile.modal.edit_bio
export default function EditBio({onClose}){
  const {state, actions} = useProfileContext()
  const {onChange, form} = useEditBio({
    gender:state.gender,
    dateOfBirth:state.dateOfBirth,
    educationalLevel:state.educationalLevel ?? '',
    relationshipStatus:state.relationshipStatus ?? ''
  })



  const handleClick = async () => {
    await actions.info.editBio(form)
    onClose()
  }

  const fields = [
    {value:'male', label:'Nam'},
    {value:'female', label:'Nữ'},
    { value:'other',label:'Khác'}
  ]

  const educationalLevels = [
    { value: 'high_school', label: 'Trung học phổ thông' },
    { value: 'college', label: 'Cao đẳng' },
    { value: 'bachelor', label: 'Cử nhân (Đại học)' },
    { value: 'master', label: 'Thạc sĩ' },
    { value: 'doctorate', label: 'Tiến sĩ' },
  ]

  const relationships = [
    { value: 'single', label: 'Độc thân' },
    { value: 'dating', label: 'Đang hẹn hò' },
    { value: 'in_relationship', label: 'Đang trong mối quan hệ' },
    { value: 'engage', label: 'Đã đính hôn' },
    { value: 'married', label: 'Đã kết hôn' },
  ]


  return(
    <Surface variant='modal' sx={sx.surface}>
      <Typography variant='title'>{text.title}</Typography>

      <Box sx={sx.block}>
        <TransgenderSharpIcon/>
        <Typography>{text.gender}</Typography>
        <RowRadioInput
          name={'gender'}
          fields={fields}
          value={form.gender}
          onChange={onChange}
        />
      </Box>

      <Box sx={sx.block}>
        <CakeSharpIcon/>
        <Typography>{text.birth_date}</Typography>
        <DateInput label={'Ngày sinh'} name={'birth'} onChange={onChange} value={form.birth}/>
      </Box>

      <Box sx={sx.block}>
        <SchoolIcon/>
        <SelectInput list={educationalLevels} value={form.educationalLevel} name={'educationalLevel'} label={'Trình độ học vấn'} onChange={onChange}/>
      </Box>

      <Box sx={sx.block}>
        <PeopleIcon/>
        <SelectInput list={relationships} value={form.relationshipStatus} name='relationshipStatus' label='Mối quan hệ' onChange={onChange}/>

      </Box>

      <Button sx={sx.submit_button} onClick = {handleClick} variant='primary'>
        {state.loading.update_profile ? <CircularProgress size={24} color='white'/>: text.confirm}
      </Button>
    </Surface>
  )
}