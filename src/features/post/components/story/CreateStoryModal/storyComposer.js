import { story } from "../../../../../constant/text/vi/story";

export const STORY_MEDIA_KIND = Object.freeze({
  NONE: "none",
  IMAGE: "image",
  VIDEO: "video",
  SOUND: "sound",
});

export const STORY_MODE = Object.freeze({
  EMPTY: "empty",
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  SOUND: "sound",
  IMAGE_TEXT: "image_text",
  VIDEO_TEXT: "video_text",
  SOUND_TEXT: "sound_text",
});

export const STORY_DURATION_RULES = Object.freeze({
  staticSeconds: 5,
});
export const STORY_LIMITS = Object.freeze({
  textCharacters: 200,
});
const STORY_MODE_LABEL = story.createStoryModal.modeLabel;

export function hasStoryText(text = "") {
  return Boolean(String(text || "").trim());
}

export function detectStoryMediaKind(contentType = "") {
  const normalizedType = String(contentType || "").toLowerCase();

  if (normalizedType.startsWith("image/")) return STORY_MEDIA_KIND.IMAGE;
  if (normalizedType.startsWith("video/")) return STORY_MEDIA_KIND.VIDEO;
  if (normalizedType.startsWith("audio/")) return STORY_MEDIA_KIND.SOUND;

  return STORY_MEDIA_KIND.NONE;
}

/**Determines whether the media kind is time-based (video or sound)*/
export function isTimedStoryMedia(mediaKind = STORY_MEDIA_KIND.NONE) {
  return mediaKind === STORY_MEDIA_KIND.VIDEO || mediaKind === STORY_MEDIA_KIND.SOUND;
}

export function isVisualStoryMedia(mediaKind = STORY_MEDIA_KIND.NONE) {
  return mediaKind === STORY_MEDIA_KIND.IMAGE || mediaKind === STORY_MEDIA_KIND.VIDEO;
}

/**
 * Resolve the story mode based on text and media type
 */
export function resolveStoryMode({
  text = "",
  mediaKind = STORY_MEDIA_KIND.NONE,
} = {}) {
  const hasText = hasStoryText(text);

  if (mediaKind === STORY_MEDIA_KIND.NONE) {
    return hasText ? STORY_MODE.TEXT : STORY_MODE.EMPTY;
  }

  if (mediaKind === STORY_MEDIA_KIND.IMAGE) {
    return hasText ? STORY_MODE.IMAGE_TEXT : STORY_MODE.IMAGE;
  }

  if (mediaKind === STORY_MEDIA_KIND.VIDEO) {
    return hasText ? STORY_MODE.VIDEO_TEXT : STORY_MODE.VIDEO;
  }

  if (mediaKind === STORY_MEDIA_KIND.SOUND) {
    return hasText ? STORY_MODE.SOUND_TEXT : STORY_MODE.SOUND;
  }

  return STORY_MODE.EMPTY;
}

/**
 * Returns the playback duration (in seconds) depending on media type.
 * Timed media uses the full source duration.
 */
export function getPlaybackSeconds({
  mediaKind = STORY_MEDIA_KIND.NONE,
  sourceDuration = 0,
} = {}) {
  if (!isTimedStoryMedia(mediaKind)) {
    return STORY_DURATION_RULES.staticSeconds;
  }

  if (!Number.isFinite(sourceDuration) || sourceDuration <= 0) {
    return 0;
  }

  return sourceDuration;
}

export function isStorySubmissionReady({
  text = "",
  media = null,
} = {}) {
  return Boolean(hasStoryText(text) || media);
}

export function formatStoryDuration(value = 0) {
  if (!Number.isFinite(value) || value <= 0) {
    return "--";
  }

  if (value >= 60) {
    const totalSeconds = Math.round(value);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  const rounded = value >= 10
    ? Math.round(value)
    : Math.round(value * 10) / 10;

  return `${rounded}s`;
}

//**Determine whether to render description text below the canvas */
export function isStoryDescriptionBelowMedia(mode = STORY_MODE.EMPTY) {
  return mode === STORY_MODE.IMAGE_TEXT || mode === STORY_MODE.VIDEO_TEXT;
}

/**Determine whether to render story text on the canvas based on mode*/
export function shouldRenderStoryTextOnCanvas(mode = STORY_MODE.EMPTY) {
  return mode === STORY_MODE.TEXT || mode === STORY_MODE.SOUND_TEXT;
}

export function getStoryModeLabel(mode = STORY_MODE.EMPTY) {
  return STORY_MODE_LABEL[mode] || STORY_MODE_LABEL[STORY_MODE.EMPTY];
}
