import { Button } from '@mui/material'
import { usePostModal } from '../../provider/usePostModal'

export default function EditPinnedStoryButton() {
  const { openModal } = usePostModal()

  return (
    <Button
      onClick={() => openModal('edit_pinned_story_modal')}
      variant="secondary"
      sx={{ display: 'flex', mx: 'auto', mt: '1rem' }}
    >
      Chỉnh sửa tin nổi bật
    </Button>
  )
}
