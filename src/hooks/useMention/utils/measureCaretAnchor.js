import { ZERO_WIDTH_MARKER } from "../const";
import {copyMirrorStyles} from './copyMirrorStyles'

const OVERLAY_WIDTH = 236;
const OVERLAY_SAFE_GAP = 8;
const OVERLAY_VERTICAL_GAP = 6;
const OVERLAY_ESTIMATED_HEIGHT = 280;

export function measureCaretAnchor(textarea) {
  if (!textarea) return { top: 0, left: 0 };

  const caretIndex = textarea.selectionStart ?? 0;
  const computedStyle = window.getComputedStyle(textarea);
  const textareaRect = textarea.getBoundingClientRect();

  const mirror = document.createElement("div");
  mirror.style.position = "fixed";
  mirror.style.visibility = "hidden";
  mirror.style.pointerEvents = "none";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordWrap = "break-word";
  mirror.style.overflow = "hidden";
  mirror.style.top = `${textareaRect.top}px`;
  mirror.style.left = `${textareaRect.left}px`;

  copyMirrorStyles(mirror, computedStyle);

  const beforeCaretNode = document.createTextNode(
    textarea.value.slice(0, caretIndex)
  );
  const marker = document.createElement("span");
  marker.textContent = ZERO_WIDTH_MARKER;

  mirror.appendChild(beforeCaretNode);
  mirror.appendChild(marker);

  document.body.appendChild(mirror);

  try {
    const markerRect = marker.getBoundingClientRect();
    const caretLeft = markerRect.left - (textarea.scrollLeft || 0);
    const preferredTop = textareaRect.bottom + OVERLAY_VERTICAL_GAP;
    const shouldOpenUpward =
      preferredTop + OVERLAY_ESTIMATED_HEIGHT > window.innerHeight - OVERLAY_SAFE_GAP;
    const top = shouldOpenUpward
      ? textareaRect.top - OVERLAY_VERTICAL_GAP
      : preferredTop;
    const left = Math.max(
      textareaRect.left + OVERLAY_SAFE_GAP,
      caretLeft
    );

    return {
      top: shouldOpenUpward
        ? Math.max(OVERLAY_SAFE_GAP, top - OVERLAY_ESTIMATED_HEIGHT)
        : Math.max(OVERLAY_SAFE_GAP, Math.min(window.innerHeight - OVERLAY_SAFE_GAP, top)),
      left: Math.max(
        OVERLAY_SAFE_GAP,
        Math.min(window.innerWidth - OVERLAY_WIDTH - OVERLAY_SAFE_GAP, left)
      ),
    };
  } finally {
    document.body.removeChild(mirror);
  }
}
