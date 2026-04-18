import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(){
  const [countdown, setCountdown] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if(intervalRef.current){
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startCountdown = useCallback((seconds:number):void => {
    clearTimer()
    if(seconds <= 0){
      setCountdown(0)
      return
    }
    setCountdown(seconds)
    intervalRef.current = setInterval(()=>{
      setCountdown(prev=>{
        if(prev <= 1){
          clearTimer()
          return 0
        }
        return prev - 1
      })
    },1000)
  }, [clearTimer])

  const stopCountDown = useCallback(():void => {
    clearTimer()
    setCountdown(0)
  }, [clearTimer])

  const resetCountdown = useCallback(():void => {
    stopCountDown()
  }, [stopCountDown])

  useEffect(()=>{
    return () => {
      clearTimer()
    }
  },[clearTimer])

  return{
    countdown,
    isRunning: countdown > 0,
    startCountdown,
    stopCountDown,
    resetCountdown
  }
}
