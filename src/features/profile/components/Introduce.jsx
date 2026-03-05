import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import TransgenderSharpIcon from '@mui/icons-material/TransgenderSharp';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import { profile } from '../../../constant/text/vi/profile.text'
import { useProfileContext } from '../hooks';
import useAuth from '../../../core/auth/useAuth';
import {formatDate} from '../../../utils/formatDate'
import {formatGender} from '../../../utils/formatGender'
import { mapping } from '../../../utils/mapping';
import { useProfileModal } from '../provider/useProfileModal'
import {Box, Button, Typography, Skeleton} from '@mui/material'
import Surface from '../../../components/common/Surface'
import {style} from '../style'
const sx = style.body.main_profile
export default function Introduce(){
    const { state } = useProfileContext()
  const { isOwner } = useAuth()
  const {openModal}  =useProfileModal()
  function Field ({field, data}){
    if(data)
      return (
        <Box width={'100%'}>
          {state.loading.get_profile ? <Skeleton sx={{width:"100%"}} animation="wave"/> : <Typography variant='normal'>{field}{data}</Typography>}
        </Box>)
    else
      return (
        <Box width={'100%'}>
          {state.loading.get_profile ? <Skeleton sx={{width:"100%"}} animation="wave"/> : <Typography variant='normal'>{field}{profile.bio.no_info}</Typography>}
        </Box>)
  }
  return(
    <Surface sx={sx.surface}>
      <Typography sx={sx.title} >{profile.bio.title}</Typography>
      
      <Box sx={sx.block}>
        <TransgenderSharpIcon/>
        <Field field={profile.bio.gender} data={formatGender(state.gender)}/>
      </Box>

      <Box sx={sx.block}>
        <CakeSharpIcon/>
        <Field field={profile.bio.birth_date} data={formatDate(state.dateOfBirth)}/>
      </Box>

      <Box sx={sx.block}>
        <SchoolIcon/>
        <Field field={profile.bio.school} data={mapping.EDUCATION_LEVEL_MAP[state.educationalLevel]} />
      </Box>

      <Box sx={sx.block}>
        <PeopleIcon/>
        <Field field={profile.bio.relationship} data={mapping.RELATIONSHIP_MAP[state.relationshipStatus]}/>
      </Box>

      {isOwner && <Button variant='primary' sx={sx.button} onClick={()=>openModal('edit_bio')}>
        {profile.bio.button}
      </Button>}
    </Surface>
  )
}