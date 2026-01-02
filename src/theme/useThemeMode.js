import { useState } from "react"

const STORAGE_KEY = 'theme-mode'
const getInitialMode = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if(saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useThemeMode(){
  const [mode, setMode] = useState(getInitialMode)
  const toggleTheme = () => {
    setMode(prev=>{
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEY,next)
      return next
    })
  }

  return {mode, toggleTheme}
}