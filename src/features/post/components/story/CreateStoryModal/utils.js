import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import VideocamIcon from "@mui/icons-material/Videocam";
import { story } from "../../../../../constant/text/vi/story";
import { upload } from "../../../../../utils/upload";
import { STORY_MEDIA_KIND } from "./storyComposer";

const STORY_TEXT = story.createStoryModal;
const MEDIA_ACTION_TEXT = STORY_TEXT.mediaButtons.actions;

export const STORY_INPUT_ACCEPT = Object.freeze({
  [STORY_MEDIA_KIND.IMAGE]: "image/*",
  [STORY_MEDIA_KIND.VIDEO]: "video/*",
  [STORY_MEDIA_KIND.SOUND]: "audio/*",
});

export const STORY_UPLOAD_HANDLER = Object.freeze({
  [STORY_MEDIA_KIND.IMAGE]: upload.image,
  [STORY_MEDIA_KIND.VIDEO]: upload.video,
  [STORY_MEDIA_KIND.SOUND]: upload.sound,
});

export const STORY_DEFAULT_FILE_ICON = NotesRoundedIcon;

export const STORY_FILE_ICON_BY_KIND = Object.freeze({
  [STORY_MEDIA_KIND.IMAGE]: AddPhotoAlternateIcon,
  [STORY_MEDIA_KIND.VIDEO]: VideocamIcon,
  [STORY_MEDIA_KIND.SOUND]: GraphicEqRoundedIcon,
});

export const STORY_MEDIA_ACTIONS = Object.freeze([
  {
    kind: STORY_MEDIA_KIND.IMAGE,
    label: MEDIA_ACTION_TEXT.image.label,
    removeLabel: MEDIA_ACTION_TEXT.image.removeLabel,
    caption: MEDIA_ACTION_TEXT.image.caption,
    accent: "#58C46A",
    Icon: AddPhotoAlternateIcon,
  },
  {
    kind: STORY_MEDIA_KIND.VIDEO,
    label: MEDIA_ACTION_TEXT.video.label,
    removeLabel: MEDIA_ACTION_TEXT.video.removeLabel,
    caption: MEDIA_ACTION_TEXT.video.caption,
    accent: "#3B82F6",
    Icon: VideocamIcon,
  },
  {
    kind: STORY_MEDIA_KIND.SOUND,
    label: MEDIA_ACTION_TEXT.sound.label,
    removeLabel: MEDIA_ACTION_TEXT.sound.removeLabel,
    caption: MEDIA_ACTION_TEXT.sound.caption,
    accent: "#2FAE88",
    Icon: GraphicEqRoundedIcon,
  },
]);

export function revokePreviewUrl(media) {
  if (media?.origin === "object-url" && media?.url) {
    URL.revokeObjectURL(media.url);
  }
}

export function clampStoryTextValue(value = "", maxLength = Infinity) {
  const normalizedValue = String(value || "");

  if (!Number.isFinite(maxLength) || maxLength < 0) {
    return normalizedValue;
  }

  return normalizedValue.slice(0, maxLength);
}

export function resizeStoryTextarea(textarea) {
  if (!textarea) return;

  textarea.style.height = "0px";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export function clampStoryPlaybackProgress(value = 0, playbackSeconds = 0) {
  if (!Number.isFinite(playbackSeconds) || playbackSeconds <= 0) {
    return 0;
  }

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return Math.min(value, playbackSeconds);
}

export function pauseStoryMedia(element) {
  element?.pause?.();
}

export function playStoryMedia(element) {
  if (!element) return;

  const playPromise = element.play?.();
  playPromise?.catch?.(() => {});
}

export function getMediaActionStatusLabel({ isRemove, isDisabled }) {
  if (isRemove) return STORY_TEXT.mediaButtons.status.active;
  if (isDisabled) return STORY_TEXT.mediaButtons.status.disabled;
  return STORY_TEXT.mediaButtons.status.add;
}
