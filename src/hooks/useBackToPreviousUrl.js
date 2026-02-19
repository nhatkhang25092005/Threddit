import { useNavigate } from "react-router-dom";
import {useCallback} from 'react'
export function useBackToPreviousUrl(){
  const navigate = useNavigate()
  return useCallback(() => {
    if(window.history.length > 1) navigate(-1)
    else navigate('/')
  },[navigate])
}