import StoryCardPreview from './StoryCardPreview'
import StoryCardViewer from './StoryCardViewer'

export default function StoryCard({
  active = false,
  canGoNext = false,
  canGoPrev = false,
  onClick,
  onClose,
  onNext,
  onPrev,
  story,
  storyCount = 1,
  storyIndex = 0,
  variant = 'preview',
}) {
  if (variant === 'viewer') {
    return (
      <StoryCardViewer
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onClose={onClose}
        onNext={onNext}
        onPrev={onPrev}
        story={story}
        storyCount={storyCount}
        storyIndex={storyIndex}
      />
    )
  }

  return (
    <StoryCardPreview
      active={active}
      onClick={onClick}
      story={story}
    />
  )
}
