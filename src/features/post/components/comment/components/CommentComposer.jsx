import { Avatar, Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { useMention } from "../../../../../hooks/useMention";
import { upload } from "../../../../../utils/upload";
import Emoji from "../../reaction/Emoji";
import { normalizeComposerMediaList } from "../utils/comment.utils";
import { style } from "../style";
import CommentComposerMediaPicker from "./CommentComposerMediaPicker";
import CommentMediaPreviewList from "./CommentMediaPreviewList";

const sx = style.list;

const mergeMediaDraft = (currentMedia = [], nextMedia = []) => [
  ...currentMedia,
  ...normalizeComposerMediaList(nextMedia),
];

export default function CommentComposer({
  autoFocus = false,
  avatarUrl = "",
  compact = false,
  initialMedia,
  initialText = "",
  onCancel,
  onSubmit,
  placeholder = commentText.composerPlaceholder,
  replyLabel = "",
  submitLabel = commentText.submit,
}) {
  const mention = useMention({ minChars: 0 });
  const { close: closeMention, setValue: setMentionValue } = mention;
  const [media, setMedia] = useState(() => normalizeComposerMediaList(initialMedia || []));
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMentionValue(initialText || "");
    closeMention();
    setMedia(normalizeComposerMediaList(initialMedia || []));
    setErrorMessage("");
  }, [closeMention, initialMedia, initialText, setMentionValue]);

  const isDisabled = useMemo(
    () => isSubmitting || (!String(mention.value || "").trim() && media.length === 0),
    [isSubmitting, media.length, mention.value]
  );

  const appendImage = (event) => {
    const nextMedia = upload.image(event, true);
    if (!nextMedia) return;
    setMedia((current) => mergeMediaDraft(current, nextMedia));
    setErrorMessage("");
  };

  const appendVideo = (event) => {
    const nextMedia = upload.video(event, true);
    if (!nextMedia) return;
    setMedia((current) => mergeMediaDraft(current, nextMedia));
    setErrorMessage("");
  };

  const appendAudio = (event) => {
    const nextMedia = upload.sound(event, true);
    if (!nextMedia) return;
    setMedia((current) => mergeMediaDraft(current, nextMedia));
    setErrorMessage("");
  };

  const handleRemoveMedia = (mediaId) => {
    setMedia((current) => current.filter((item) => item.id !== mediaId));
  };

  const handleSubmit = async () => {
    const normalizedText = String(mention.value || "").trim();

    if (!normalizedText && media.length === 0) {
      setErrorMessage(commentText.validationRequired);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await onSubmit?.({
        media,
        text: normalizedText,
      });

      if (result?.success === false) {
        setErrorMessage(result.message || commentText.validationRequired);
        return;
      }

      setMentionValue("");
      closeMention();
      setMedia([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={sx.composerCard(compact)}>
      <Avatar src={avatarUrl} sx={sx.composerAvatar(compact)} />

      <Box sx={sx.composerBody}>
        {replyLabel ? <Box sx={sx.composerReplyTag}>{replyLabel}</Box> : null}

        <TextField
          autoFocus={autoFocus}
          fullWidth
          maxRows={compact ? 6 : 8}
          minRows={1}
          inputRef={mention.bind.ref}
          multiline
          onChange={(event) => {
            mention.bind.onChange(event);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
          onClick={mention.bind.onClick}
          onKeyDown={mention.bind.onKeyDown}
          onScroll={mention.bind.onScroll}
          onSelect={mention.bind.onSelect}
          placeholder={placeholder}
          sx={sx.composerTextarea}
          value={mention.value}
          variant="outlined"
        />
        {mention.overlay}

        <CommentMediaPreviewList items={media} onRemove={handleRemoveMedia} />

        <Box sx={sx.composerFooter}>
          <Box sx={sx.composerTools}>
            <Box sx={sx.composerEmojiWrap}>
              <Emoji mention={mention} />
            </Box>

            <CommentComposerMediaPicker
              onPickAudio={appendAudio}
              onPickImage={appendImage}
              onPickVideo={appendVideo}
            />
          </Box>

          <Box sx={sx.composerActions}>
            {onCancel ? (
              <Button onClick={onCancel} sx={sx.composerCancelButton} variant="text">
                {commentText.cancel}
              </Button>
            ) : null}

            <Button
              disabled={isDisabled}
              onClick={handleSubmit}
              sx={sx.composerSubmitButton}
              variant="contained"
            >
              {submitLabel}
            </Button>
          </Box>
        </Box>

        {errorMessage ? (
          <Box sx={{ color: "error.main", fontSize: "0.82rem", lineHeight: 1.5 }}>
            {errorMessage}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
