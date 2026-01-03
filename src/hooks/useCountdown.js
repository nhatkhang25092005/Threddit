import { useEffect, useRef, useState } from "react";

export function useCountdown(){
  const [countdown, setCountdown] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const startCountdown = (seconds) => {
    if(intervalRef.current){
      clearInterval(intervalRef.current) 
    }
    setCountdown(seconds)
    setIsRunning(true)
  }

  const stopCountDown = () => {
    if(intervalRef.current){
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
    setCountdown(0)
  }

  const resetCountdown = () => stopCountDown()

  useEffect(()=>{
    if(isRunning && countdown >0){
      intervalRef.current = setInterval(()=>{
        setCountdown(prev=>{
          if(prev<=1){
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      },1000)
    }
    return () => {
      if(intervalRef.current){
        clearInterval(intervalRef.current)
      }
    }
  },[isRunning, countdown])

  return{
    countdown,
    isRunning,
    startCountdown,
    stopCountDown,
    resetCountdown
  }
}