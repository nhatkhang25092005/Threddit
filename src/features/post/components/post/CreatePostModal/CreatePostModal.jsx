import { Box, Button, Divider, CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import Surface from "../../../../../components/common/Surface";
import useAuth from "../../../../../core/auth/useAuth";
import { useMention } from "../../../../../hooks/useMention";
import { upload } from "../../../../../utils/upload";
import MentionListModal from "../../shared/MentionListModal";
import { style } from "../style"
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
  const nextImages = upload.image(event, true)
  if (!nextImages?.length) return;
  setImage((prev) => [...nextImages, ...prev]);
};

const uploadVideo = (event, setVideo) => {
  const nextVideos = upload.video(event, true);
  if (!nextVideos?.length) return;
  setVideo((prev) => [...nextVideos, ...prev]);
};

const uploadSound = (event, setSound) => {
  const nextSounds = upload.sound(event, true);
  if (!nextSounds?.length) return;
  setSound((prev) => [...nextSounds, ...prev]);
};

const removeMediaByIndex = (setMedia, index) => {
  setMedia((prev) => {
    if (index < 0 || index >= prev.length) return prev;

    const next = [...prev];
    const [removed] = next.splice(index, 1);

    if (removed?.url) URL.revokeObjectURL(removed.url)

    return next
  });
};

export default function CreatePostModal({
  onClose,
  initialImages = [],
  initialVideos = [],
  initialSounds = [],
}) {
  const { user } = useAuth();
  const {actions:{createPost}, selector} = usePostContext()
  const mention = useMention({ minChars: 0 });
  const [openCloseAlert, setOpenCloseAlert] = useState(false);
  const [images, setImage] = useState(() =>
    Array.isArray(initialImages) ? initialImages : []
  )
  const [videos, setVideo] = useState(() =>
    Array.isArray(initialVideos) ? initialVideos : []
  )
  const [sounds, setSound] = useState(() =>
    Array.isArray(initialSounds) ? initialSounds : []
  )
  const [openMentionList, setOpenMentionList] = useState(false)
  const loading = selector.loading.getCreatePostLoading()

  const displayName = user?.displayName || user?.username || "Ban";
  const mediaCount = images.length + videos.length + sounds.length;
  const hasMedia = mediaCount > 0
  const disableSubmit =
    !mention.value
    && images.length == 0
    && sounds.length == 0
    && videos.length == 0
    || loading
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

    await createPost({
      text: mention.value || "",
      type:'post',
      mentionedUsers: getMentions(mention.value || ""),
      media:[...images, ...sounds, ...videos]
    }, onClose);
  }, [createPost, mention.value, images, sounds, videos, onClose]);

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
          loading={loading}
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

        <Button disabled={disableSubmit} variant="primary" fullWidth sx={sx.submitButton} onClick={handleSubmit}>
          {loading ? <CircularProgress size={20} color="inherit"/> : 'Đăng'}
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
