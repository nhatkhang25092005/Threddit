import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import TransgenderSharpIcon from '@mui/icons-material/TransgenderSharp';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import { profile } from '../../../constant/text/vi/profile.text'
import { useProfileContext } from '../hooks';
import useAuth from '../../../core/auth/useAuth';
import {formatDate} from '../../../utils/formatDate'
import { useProfileModal } from '../provider/useProfileModal'
import {Box, Button, Typography, Skeleton} from '@mui/material'
import Surface from '../../../components/common/Surface'
import {style} from '../style'

const sx = style.body.main_profile

export default function Introduce(){
  const { state } = useProfileContext()
  const { isOwner } = useAuth()
  const {openModal}  =useProfileModal()

  const renderField = (field:string, data?:string) => {
    return (
      <Box width="100%">
        {state.loading.get_profile ? (
          <Skeleton sx={{ width: '100%' }} animation="wave" />
        ) : (
          <Typography variant="normal">
            {field}{data || profile.bio.no_info}
          </Typography>
        )}
      </Box>
    )
  }
    return(
    <Surface sx={sx.surface}>
      <Typography sx={sx.title} >{profile.bio.title}</Typography>
      
      <Box sx={sx.block}>
        <TransgenderSharpIcon/>
        {renderField(profile.bio.gender, profile.bio_value.gender[state.gender])}
      </Box>

      <Box sx={sx.block}>
        <CakeSharpIcon/>
        {renderField(profile.bio.birth_date, formatDate(state.dateOfBirth))}
      </Box>

      <Box sx={sx.block}>
        <SchoolIcon/>
        {renderField(profile.bio.school, profile.bio_value.education[state.educationalLevel])}
      </Box>

      <Box sx={sx.block}>
        <PeopleIcon/>
        {renderField(profile.bio.relationship, profile.bio_value.relationship[state.relationshipStatus])}
      </Box>

      {isOwner && <Button variant='primary' sx={sx.button} onClick={()=>openModal('edit_bio')}>
        {profile.bio.button}
      </Button>}
    </Surface>
  )
}