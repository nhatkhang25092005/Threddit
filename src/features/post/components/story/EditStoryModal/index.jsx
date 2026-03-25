import { useMemo } from "react";
import CreateStoryModal from "../CreateStoryModal/CreateStoryModal";
import { story as storyText } from "../../../../../constant/text/vi/story";
import { usePostContext } from "../../../hooks";

const resolveStoryComposerMedia = (story) => {
  const mediaFiles = Array.isArray(story?.mediaFiles) ? [...story.mediaFiles] : [];
  const storyMedia = mediaFiles
    .filter(Boolean)
    .sort((left, right) => {
      const leftOrder = Number.isFinite(left?.sortOrder) ? left.sortOrder : Number.MAX_SAFE_INTEGER;
      const rightOrder = Number.isFinite(right?.sortOrder) ? right.sortOrder : Number.MAX_SAFE_INTEGER;

      return leftOrder - rightOrder;
    })[0];

  if (!storyMedia) {
    return null;
  }

  return {
    ...storyMedia,
    kind: storyMedia.type || "image",
    contentType: storyMedia.type || "image",
    origin: "remote",
  };
};

export default function EditStoryModal({ onClose, storyId }) {
  const {
    selector: {
      story: { getStoryById }
    }
  } = usePostContext();

  const story = getStoryById(storyId);
  const initialMedia = useMemo(() => resolveStoryComposerMedia(story), [story]);

  if (!story || story.id == null) {
    return null;
  }

  return (
    <CreateStoryModal
      onClose={onClose}
      headerTitle={storyText.editStoryModal.title}
      headerSubtitle={storyText.editStoryModal.subtitle}
      closeAriaLabel={storyText.editStoryModal.closeAriaLabel}
      submitLabel={storyText.editStoryModal.submitLabel}
      composerOptions={{
        mode: "edit",
        contentId: story.id,
        initialText: story.text || "",
        initialMedia,
      }}
    />
  );
}
