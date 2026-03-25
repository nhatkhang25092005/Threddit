import { Avatar, Box, Button, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { commentText } from "../../../../../constant/text/vi/post/comment.text";
import { useMention } from "../../../../../hooks/useMention";
import { extractUsernames } from "../../../../../utils/extractUsernames";
import { upload } from "../../../../../utils/upload";
import Emoji from "../../reaction/Emoji";
import { normalizeComposerMediaList } from "../utils/comment.utils";
import { style } from "../style";
import CommentComposerMediaPicker from "./CommentComposerMediaPicker";
import CommentMediaPreviewList from "./CommentMediaPreviewList";

const sx = style.list;

const replaceMediaDraft = (nextMedia) =>
  normalizeComposerMediaList(Array.isArray(nextMedia) ? nextMedia : [nextMedia]).slice(0, 1);

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
    const nextMedia = upload.image(event);
    if (!nextMedia) return;
    setMedia(replaceMediaDraft(nextMedia));
    setErrorMessage("");
  };

  const appendVideo = (event) => {
    const nextMedia = upload.video(event);
    if (!nextMedia) return;
    setMedia(replaceMediaDraft(nextMedia));
    setErrorMessage("");
  };

  const appendAudio = (event) => {
    const nextMedia = upload.sound(event);
    if (!nextMedia) return;
    setMedia(replaceMediaDraft(nextMedia));
    setErrorMessage("");
  };

  const handleRemoveMedia = (mediaId) => {
    setMedia((current) => current.filter((item) => item.id !== mediaId));
  };

  const handleSubmit = async () => {
    const normalizedText = String(mention.value || "").trim();
    const mentionedUsers = extractUsernames(normalizedText);

    if (!normalizedText && media.length === 0) {
      setErrorMessage(commentText.validationRequired);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const result = await onSubmit?.({
        media,
        mentionedUsers,
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

  const editorContent = (
    <>
      {replyLabel ? <Box sx={sx.composerReplyTag(compact)}>{replyLabel}</Box> : null}

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
        size={compact ? "small" : "medium"}
        sx={sx.composerTextarea(compact)}
        value={mention.value}
        variant="outlined"
      />
      {mention.overlay}

      <CommentMediaPreviewList items={media} onRemove={handleRemoveMedia} />
    </>
  );

  const footerContent = (
    <Box sx={sx.composerFooter(compact)}>
      <Box sx={sx.composerTools(compact)}>
        <Box sx={sx.composerEmojiWrap(compact)}>
          <Emoji mention={mention} />
        </Box>

        <CommentComposerMediaPicker
          compact={compact}
          onPickAudio={appendAudio}
          onPickImage={appendImage}
          onPickVideo={appendVideo}
        />
      </Box>

      <Box sx={sx.composerActions(compact)}>
        {onCancel ? (
          <Button onClick={onCancel} sx={sx.composerCancelButton(compact)} variant="text">
            {commentText.cancel}
          </Button>
        ) : null}

        <Button
          disabled={isDisabled}
          onClick={handleSubmit}
          sx={sx.composerSubmitButton(compact)}
          variant="contained"
        >
          {submitLabel}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={sx.composerCard(compact)}>
      {compact ? (
        <>
          <Avatar src={avatarUrl} sx={sx.composerAvatar(compact)} />

          <Box sx={sx.composerBody(compact)}>
            {editorContent}
            {footerContent}
          </Box>
        </>
      ) : (
        <>
          <Box sx={sx.composerMainRow}>
            <Avatar src={avatarUrl} sx={sx.composerAvatar(compact)} />

            <Box sx={sx.composerBody(compact)}>
              {editorContent}
            </Box>
          </Box>

          {footerContent}
        </>
      )}

      {errorMessage ? (
        <Box sx={{ color: "error.main", fontSize: "0.82rem", lineHeight: 1.5 }}>
          {errorMessage}
        </Box>
      ) : null}
    </Box>
  );
}
