import { Box, Divider, Typography } from '@mui/material'
import Surface from '../../../../../components/common/Surface'
import {
  EditPinnedStoryEmptyState,
  EditPinnedStoryGrid,
  EditPinnedStoryModalHeader,
} from './components'
import { usePinnedStoriesData } from './hooks'
import { EDIT_PINNED_STORY_MODAL_TEXT } from './utils/constants'
import { style } from './style'

const sx = style.editPinnedStoryModal

export default function EditPinnedStoryModal({ onClose }) {
  const {
    isLoading,
    pinnedStories,
    removingStoryIds,
    unpinPinnedStory,
  } = usePinnedStoriesData()

  return (
    <Surface variant="modal" sx={sx.surface}>
      <EditPinnedStoryModalHeader
        onClose={onClose}
        storyCount={pinnedStories.length}
      />

      <Divider sx={sx.divider} />

      <Box sx={sx.content.container}>

        {pinnedStories.length > 0 ? (
          <EditPinnedStoryGrid
            removingStoryIds={removingStoryIds}
            stories={pinnedStories}
            onUnpin={unpinPinnedStory}
          />
        ) : (
          <EditPinnedStoryEmptyState isLoading={isLoading} />
        )}
      </Box>
    </Surface>
  )
}
