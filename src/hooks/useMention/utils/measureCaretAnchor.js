import { ZERO_WIDTH_MARKER } from "../const";
import { parseLineHeight } from "./parseLineHeight";
import {copyMirrorStyles} from './copyMirrorStyles'
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
    const lineHeight = parseLineHeight(computedStyle);
    const top = markerRect.top + lineHeight - (textarea.scrollTop || 0) + 6;
    const left = markerRect.left - (textarea.scrollLeft || 0);

    return {
      top: Math.max(8, Math.min(window.innerHeight - 8, top)),
      left: Math.max(8, Math.min(window.innerWidth - 236, left)),
    };
  } finally {
    document.body.removeChild(mirror);
  }
}
