import { useRef } from "react";
import { useLayoutEffect, useState } from "react";
export default function Test() {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if(!textarea) return
    textarea.style.height = '0px'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value])
  
  return (
    <textarea
      value={value}
      ref={textareaRef}
      onChange={(e) => setValue(e.target.value)}
    ></textarea>
  );
}
