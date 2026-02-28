import { useLayoutEffect } from "react";
export function useAdjustLayout(mention, mediaCount) {
  useLayoutEffect(() => {
    const textarea = mention.bind?.ref?.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [mention.value, mediaCount, mention.bind?.ref]);
}
