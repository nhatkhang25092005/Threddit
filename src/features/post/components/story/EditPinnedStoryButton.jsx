import { Button } from '@mui/material'
import { story } from '../../../../constant/text/vi/story'
import { usePostModal } from '../../provider/usePostModal'

export default function EditPinnedStoryButton() {
  const { openModal } = usePostModal()

  return (
    <Button
      onClick={() => openModal('edit_pinned_story_modal')}
      variant="secondary"
      sx={{ display: 'flex', mx: 'auto', mt: '1rem' }}
    >
      {story.pinnedSection.editButton}
    </Button>
  )
}
