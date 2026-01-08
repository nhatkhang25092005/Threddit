import { useState } from "react"
import {useNotify} from '../../../../hooks/useNotify'
export function useDeleteAccount(){
  const notify = useNotify()
  const [loading, setLoading] = useState(false)
  
  const submit = () => {
    
  }
  return{
    loading,
    submit
  }
}