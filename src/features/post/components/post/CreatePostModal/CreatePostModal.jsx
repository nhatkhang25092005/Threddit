import { Box, Button, Divider } from "@mui/material";
import { useCallback, useState } from "react";
import Surface from "../../../../../components/common/Surface";
import useAuth from "../../../../../core/auth/useAuth";
import { useMention } from "../../../../../hooks/useMention";
import { upload } from "../../../../../utils/upload";
import MentionListModal from "../../shared/MentionListModal";
import { style } from "../style";
import {
  CreatePostModalActionBar,
  CreatePostModalAuthor,
  CreatePostModalEditor,
  CreatePostModalHeader,
} from "./components";
import { useAdjustLayout } from "./hooks/useAdjustLayout";
import { usePostContext } from "../../../hooks";
import { getMentions } from "../../../../../utils/getMentions";
import CloseAlert from "./components/CloseAlert";

const sx = style.createPostModal;

const uploadImage = (event, setImage) => {
  const nextImage = upload.image(event);
  if (!nextImage) return;
  setImage((prev) => [nextImage, ...prev]);
};

const uploadVideo = (event, setVideo) => {
  const nextVideo = upload.video(event);
  if (!nextVideo) return;
  setVideo((prev) => [nextVideo, ...prev]);
};

const uploadSound = (event, setSound) => {
  const nextSound = upload.sound(event);
  if (!nextSound) return;
  setSound((prev) => [nextSound, ...prev]);
};

const removeMediaByIndex = (setMedia, index) => {
  setMedia((prev) => {
    if (index < 0 || index >= prev.length) return prev;

    const next = [...prev];
    const [removed] = next.splice(index, 1);

    if (removed?.url) {
      URL.revokeObjectURL(removed.url);
    }

    return next;
  });
};

export default function CreatePostModal({ onClose }) {
  const { user } = useAuth();
  const {actions:{createPost}} = usePostContext()

  const mention = useMention({ minChars: 0 });
  const [openCloseAlert, setOpenCloseAlert] = useState(false);
  const [images, setImage] = useState([]);
  const [videos, setVideo] = useState([]);
  const [sounds, setSound] = useState([]);
  const [openMentionList, setOpenMentionList] = useState(false);

  const displayName = user?.displayName || user?.username || "Ban";
  const mediaCount = images.length + videos.length + sounds.length;
  const hasMedia = mediaCount > 0;

  useAdjustLayout(mention, mediaCount);

  const handleUploadImage = useCallback((event) => {
    uploadImage(event, setImage);
  }, []);

  const handleUploadVideo = useCallback((event) => {
    uploadVideo(event, setVideo);
  }, []);

  const handleUploadSound = useCallback((event) => {
    uploadSound(event, setSound);
  }, []);

  const handleRemoveImage = useCallback((index) => {
    removeMediaByIndex(setImage, index);
  }, []);

  const handleRemoveVideo = useCallback((index) => {
    removeMediaByIndex(setVideo, index);
  }, []);

  const handleRemoveSound = useCallback((index) => {
    removeMediaByIndex(setSound, index);
  }, []);

  const handleOpenMentionList = useCallback(() => {
    setOpenMentionList(true);
  }, []);

  const handleCloseMentionList = useCallback(() => {
    setOpenMentionList(false);
  }, []);

  const handleAttemptClose = useCallback(() => {
    setOpenCloseAlert(true);
  }, []);

  const handleCancelClose = useCallback(() => {
    setOpenCloseAlert(false);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setOpenCloseAlert(false);
    onClose?.();
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    const imagesCount = images.length;
    const soundsCount = sounds.length;
    const videosCount = videos.length;

    const mediaFilesNumber = imagesCount + soundsCount + videosCount;
    const isHadMediaFiles = mediaFilesNumber > 0;

    const mediaContentTypes = [
      imagesCount > 0 && "image/*",
      soundsCount > 0 && "audio/*",
      videosCount > 0 && "video/*",
    ].filter(Boolean);

    await createPost({
      text: mention.value || "",
      isHadMediaFiles,
      mentionedUsers: getMentions(mention.value || ""),
      mediaFilesNumber,
      mediaContentTypes,
    });
  }, [images.length, sounds.length, videos.length, mention.value, createPost]);

  return (
    <Surface variant="modal" sx={sx.surface}>
      <CreatePostModalHeader sx={sx} onClose={handleAttemptClose} />

      <Divider sx={sx.divider} />

      <Box sx={sx.body}>
        <CreatePostModalAuthor
          sx={sx}
          avatarUrl={user?.avatarUrl}
          displayName={displayName}
        />

        <CreatePostModalEditor
          sx={sx}
          mention={mention}
          images={images}
          videos={videos}
          sounds={sounds}
          hasMedia={hasMedia}
          displayName={displayName}
          onRemoveImage={handleRemoveImage}
          onRemoveVideo={handleRemoveVideo}
          onRemoveSound={handleRemoveSound}
        />

        <CreatePostModalActionBar
          sx={sx}
          mention={mention}
          onUploadImage={handleUploadImage}
          onUploadVideo={handleUploadVideo}
          onUploadSound={handleUploadSound}
          onOpenMentionList={handleOpenMentionList}
        />

        <Button variant="primary" fullWidth sx={sx.submitButton} onClick={handleSubmit}>
          Đăng
        </Button>
      </Box>

      {openMentionList ? (
        <MentionListModal onClose={handleCloseMentionList} mention={mention} />
      ) : null}

      {openCloseAlert ? (
        <CloseAlert onConfirm={handleConfirmClose} onCancel={handleCancelClose} />
      ) : null}
    </Surface>
  );
}
