import { Box, Button, CircularProgress, Divider } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Surface from "../../../../../components/common/Surface";
import { composerText } from "../../../../../constant/text/vi/post/composer.text";
import useAuth from "../../../../../core/auth/useAuth";
import { useMention } from "../../../../../hooks/useMention";
import { upload } from "../../../../../utils/upload";
import { getMentions } from "../../../../../utils/getMentions";
import MentionListModal from "../../shared/MentionListModal";
import { usePostContext } from "../../../hooks";
import { style } from "../style";
import CloseAlert from "./components/CloseAlert";
import {
  CreatePostModalActionBar,
  CreatePostModalAuthor,
  CreatePostModalEditor,
  CreatePostModalHeader,
} from "./components";
import { useAdjustLayout } from "./hooks/useAdjustLayout";
import {
  buildInitialMediaItems,
  DEFAULT_CLOSE_ALERT,
  EDIT_CLOSE_ALERT,
  getComposerImages,
  getComposerSounds,
  getComposerVideos,
  mapComposerMediaForSubmit,
  POST_MODAL_MODE,
  prependUploadedMediaItems,
  removeComposerMediaByMatcherAtIndex,
  revokeComposerMediaPreview,
} from "./utils";

const sx = style.createPostModal;

export default function CreatePostModal({
  onClose,
  initialImages = [],
  initialVideos = [],
  initialSounds = [],
  initialMedia = [],
  initialText = "",
  contentId = null,
  mode = POST_MODAL_MODE.CREATE,
  title = composerText.post.createTitle,
  submitLabel = composerText.post.submitLabel,
  closeAlertTitle = null,
  closeAlertMessage = null,
}) {
  const { user } = useAuth();
  const {
    actions: { createPost, editPost },
    selector: {
      loading: { getCreatePostLoading, getEditPostLoading }
    }
  } = usePostContext();
  const mention = useMention({ minChars: 0 });
  const { setValue: setMentionValue } = mention;
  const modeRef = useRef(mode === POST_MODAL_MODE.EDIT ? POST_MODAL_MODE.EDIT : POST_MODAL_MODE.CREATE);
  const contentIdRef = useRef(contentId);
  const initialTextRef = useRef(initialText || "");
  const mediaItemsRef = useRef([]);
  const cleanupTimeoutRef = useRef(null);
  const [openCloseAlert, setOpenCloseAlert] = useState(false);
  const [openMentionList, setOpenMentionList] = useState(false);
  const [mediaItems, setMediaItems] = useState(() =>
    buildInitialMediaItems({
      initialMedia,
      initialImages,
      initialVideos,
      initialSounds,
    })
  );
  const loading = modeRef.current === POST_MODAL_MODE.EDIT
    ? getEditPostLoading()
    : getCreatePostLoading();

  mediaItemsRef.current = mediaItems;

  useEffect(() => {
    setMentionValue(initialTextRef.current);
  }, [setMentionValue]);

  useEffect(() => {
    if (cleanupTimeoutRef.current) {
      window.clearTimeout(cleanupTimeoutRef.current);
      cleanupTimeoutRef.current = null;
    }

    return () => {
      const mediaSnapshot = [...mediaItemsRef.current];

      cleanupTimeoutRef.current = window.setTimeout(() => {
        mediaSnapshot.forEach((item) => revokeComposerMediaPreview(item));
        cleanupTimeoutRef.current = null;
      }, 0);
    };
  }, []);

  const displayName = user?.displayName || user?.username || composerText.post.fallbackDisplayName;
  const images = useMemo(() => getComposerImages(mediaItems), [mediaItems]);
  const videos = useMemo(() => getComposerVideos(mediaItems), [mediaItems]);
  const sounds = useMemo(() => getComposerSounds(mediaItems), [mediaItems]);
  const mediaCount = mediaItems.length;
  const hasMedia = mediaCount > 0;
  const disableSubmit = (!mention.value && mediaItems.length === 0) || loading;
  useAdjustLayout(mention, mediaCount);

  const handleUploadImage = useCallback((event) => {
    prependUploadedMediaItems(setMediaItems, upload.image(event, true));
  }, []);

  const handleUploadVideo = useCallback((event) => {
    prependUploadedMediaItems(setMediaItems, upload.video(event, true));
  }, []);

  const handleUploadSound = useCallback((event) => {
    prependUploadedMediaItems(setMediaItems, upload.sound(event, true));
  }, []);

  const handleRemoveImage = useCallback((index) => {
    setMediaItems((prev) => removeComposerMediaByMatcherAtIndex({
      index,
      mediaItems: prev,
      matcher: (item) => item?.type === "image",
    }));
  }, []);

  const handleRemoveVideo = useCallback((index) => {
    setMediaItems((prev) => removeComposerMediaByMatcherAtIndex({
      index,
      mediaItems: prev,
      matcher: (item) => item?.type === "video",
    }));
  }, []);

  const handleRemoveSound = useCallback((index) => {
    setMediaItems((prev) => removeComposerMediaByMatcherAtIndex({
      index,
      mediaItems: prev,
      matcher: (item) => item?.type === "audio" || item?.type === "sound",
    }));
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
    const payload = {
      text: mention.value || "",
      type: "post",
      mentionedUsers: getMentions(mention.value || ""),
      media: mapComposerMediaForSubmit(mediaItems),
    };

    if (modeRef.current === POST_MODAL_MODE.EDIT) {
      await editPost({
        ...payload,
        contentId: contentIdRef.current,
      }, onClose);
      return;
    }

    await createPost(payload, onClose);
  }, [createPost, editPost, mediaItems, mention.value, onClose]);

  const alertTitle = closeAlertTitle || (
    modeRef.current === POST_MODAL_MODE.EDIT
      ? EDIT_CLOSE_ALERT.title
      : DEFAULT_CLOSE_ALERT.title
  );
  const alertMessage = closeAlertMessage || (
    modeRef.current === POST_MODAL_MODE.EDIT
      ? EDIT_CLOSE_ALERT.message
      : DEFAULT_CLOSE_ALERT.message
  );

  return (
    <Surface variant="modal" sx={sx.surface}>
      <CreatePostModalHeader sx={sx} onClose={handleAttemptClose} title={title} />

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

        <Button
          disabled={disableSubmit}
          variant="primary"
          fullWidth
          sx={sx.submitButton}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : submitLabel}
        </Button>
      </Box>

      {openMentionList ? (
        <MentionListModal onClose={handleCloseMentionList} mention={mention} />
      ) : null}

      {openCloseAlert ? (
        <CloseAlert
          onConfirm={handleConfirmClose}
          onCancel={handleCancelClose}
          title={alertTitle}
          message={alertMessage}
        />
      ) : null}
    </Surface>
  );
}
