import { useCallback } from "react";
import { clamp } from "../utils";

export function useKeyDown(open, setActiveIndex, friendList, close, insertMention, activeIndex){
  const onKeyDown = useCallback((e) => {
    if(!open) return
    if(e.key === 'Escape'){
      e.preventDefault()
      close()
      return
    }
    if(e.key === 'ArrowDown'){
      e.preventDefault()
      setActiveIndex((current) => clamp(current + 1, 0, friendList.length - 1))
      return
    }
    if(e.key === 'ArrowUp'){
      e.preventDefault()
      setActiveIndex((current) => clamp(current - 1, 0, friendList.length - 1))
      return
    }
    if(e.key === 'Enter' && friendList[activeIndex]){
      e.preventDefault()
      insertMention()
    }
  },[activeIndex, open, setActiveIndex, friendList, insertMention, close])

  return onKeyDown
}