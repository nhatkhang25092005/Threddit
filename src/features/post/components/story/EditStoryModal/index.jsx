import { useMemo } from "react";
import CreateStoryModal from "../CreateStoryModal/CreateStoryModal";
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
      headerTitle="Chỉnh sửa tin"
      headerSubtitle="Bạn có thể cập nhật nội dung hoặc thay media cho tin này"
      closeAriaLabel="Đóng modal chỉnh sửa tin"
      submitLabel="Xác nhận chỉnh sửa"
      composerOptions={{
        mode: "edit",
        contentId: story.id,
        initialText: story.text || "",
        initialMedia,
      }}
    />
  );
}
