import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMention } from "../../../../../../hooks/useMention";
import {
  STORY_MEDIA_KIND,
  STORY_LIMITS,
  detectStoryMediaKind,
  getPlaybackSeconds,
  isStorySubmissionReady,
  resolveStoryMode,
} from "../storyComposer";
import {
  clampStoryTextValue,
  revokePreviewUrl,
  STORY_UPLOAD_HANDLER,
} from "../utils"
import { usePostContext } from "../../../../hooks";
import { getMentions } from "../../../../../../utils/getMentions";

export function useCreateStoryComposer(options = {}) {
  const {
    actions: { createStory, editStory },
    selector: {
      loading: { getCreateStoryLoading, getEditStoryLoading }
    }
  } = usePostContext()
  const modeRef = useRef(options?.mode === "edit" ? "edit" : "create")
  const contentIdRef = useRef(options?.contentId ?? null)
  const submitActionRef = useRef(
    typeof options?.submitAction === "function" ? options.submitAction : null
  )
  const initialTextRef = useRef(options?.initialText || "")
  const initialMediaRef = useRef(options?.initialMedia || null)
  const storyLoading = modeRef.current === "edit"
    ? getEditStoryLoading()
    : getCreateStoryLoading()
  const [media, setMedia] = useState(() => initialMediaRef.current);
  const [sourceDurationSeconds, setSourceDurationSeconds] = useState(0);
  const [isMentionListOpen, setIsMentionListOpen] = useState(false);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const soundInputRef = useRef(null);
  const mention = useMention({ minChars: 0 });
  const { close: closeMention, setValue: setMentionValue, value: text } = mention;
  const textLimit = STORY_LIMITS.textCharacters;
  const mediaKind = media?.kind || STORY_MEDIA_KIND.NONE;
  const mode = resolveStoryMode({ text, mediaKind });
  const playbackSeconds = getPlaybackSeconds({
    mediaKind,
    sourceDuration: sourceDurationSeconds,
  });
  const canSubmit = isStorySubmissionReady({
    text,
    media,
  })

  const inputRefsByKind = useMemo(
    () => ({
      [STORY_MEDIA_KIND.IMAGE]: imageInputRef,
      [STORY_MEDIA_KIND.VIDEO]: videoInputRef,
      [STORY_MEDIA_KIND.SOUND]: soundInputRef,
    }),
    []
  );

  useEffect(() => {
    setMentionValue(initialTextRef.current);
  }, [setMentionValue]);

  useEffect(() => () => revokePreviewUrl(media), [media]);

  useEffect(() => {
    const normalizedText = clampStoryTextValue(text, textLimit);

    if (normalizedText !== text) {
      setMentionValue(normalizedText);
    }
  }, [setMentionValue, text, textLimit]);

  const handleOpenPicker = useCallback(
    (kind) => {
      inputRefsByKind[kind]?.current?.click();
    },
    [inputRefsByKind]
  );

  const handleOpenMentionList = useCallback(() => {
    closeMention();
    setIsMentionListOpen(true);
  }, [closeMention]);

  const handleCloseMentionList = useCallback(() => {
    setIsMentionListOpen(false);
  }, []);

  const handleSelectMedia = useCallback(
    (kind, event) => {
      const nextMedia = STORY_UPLOAD_HANDLER[kind]?.(event);

      if (!nextMedia) return;

      const detectedKind = detectStoryMediaKind(nextMedia.contentType);

      setMedia({
        ...nextMedia,
        kind: detectedKind === STORY_MEDIA_KIND.NONE ? kind : detectedKind,
        origin: "object-url",
      });
      setSourceDurationSeconds(0);
    },
    []
  );

  const handleRemoveMedia = useCallback(() => {
    setMedia(null);
    setSourceDurationSeconds(0);
  }, []);

  const handleMediaMetadata = useCallback((duration) => {
    if (!Number.isFinite(duration) || duration <= 0) return;
    setSourceDurationSeconds(duration);
  }, []);

  const handleSubmit = useCallback(async (onClose) => {
    if (!canSubmit) return

    const payload = {
      text: mention.value || "",
      type:'story',
      mentionedUsers: getMentions(mention.value || ""),
      media: media ? [{ ...media, sortOrder: 1 }] : [],
    }

    if (modeRef.current === "edit") {
      const editPayload = {
        ...payload,
        contentId: contentIdRef.current,
      }

      if (submitActionRef.current) {
        await submitActionRef.current(editPayload, onClose)
        return
      }

      await editStory(editPayload, onClose)
      return
    }

    if (submitActionRef.current) {
      await submitActionRef.current(payload, onClose)
      return
    }

    await createStory(payload, onClose)
  }, [canSubmit, createStory, editStory, media, mention.value]);

  return {
    canSubmit,
    inputRefsByKind,
    isMentionListOpen,
    media,
    mention,
    mode,
    playbackSeconds,
    sourceDurationSeconds,
    text,
    loading: storyLoading,
    handleCloseMentionList,
    handleMediaMetadata,
    handleOpenMentionList,
    handleOpenPicker,
    handleRemoveMedia,
    handleSelectMedia,
    handleSubmit,
  };
}
