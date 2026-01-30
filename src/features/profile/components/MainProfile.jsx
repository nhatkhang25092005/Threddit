import { memo } from 'react'
import Surface from '../../../components/common/Surface'
import {style} from '../style'
import {Box, Button, Typography, Skeleton} from '@mui/material'
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import TransgenderSharpIcon from '@mui/icons-material/TransgenderSharp';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import { profile } from '../../../constant/text/vi/profile.text'
import { useProfileContext } from '../hooks';
import {formatDate} from '../../../utils/formatDate'
import {formatGender} from '../../../utils/formatGender'
import { mapping } from '../../../utils/mapping';

const sx = style.body.main_profile
const MainProfile = memo(function MainProfile(){
  const {state, actions} = useProfileContext()
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
    <Box sx={sx.container}>
      {/* Base info */}
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

        <Button variant='primary' sx={sx.button} onClick={()=>actions.modalManager.openModal('edit_bio')}>
          {profile.bio.button}
        </Button>
      </Surface>
      {/* Posts-build later */}
    </Box>
  )
})

export default MainProfile