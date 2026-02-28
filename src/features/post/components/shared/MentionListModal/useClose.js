import { useEffect } from "react";

export function useClose(onClose, mentionClose = null){
  useEffect(()=>{
    mentionClose?.()
    const onKeyDownCapture = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose?.();
      }
    }
    window.addEventListener("keydown",onKeyDownCapture,true)
    return () => window.removeEventListener("keydown", onKeyDownCapture, true);
  },[mentionClose, onClose])
}