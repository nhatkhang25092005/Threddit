import { useState } from "react";
import SnackBarLoading from "../components/notify/SnackBarLoading";

export default function Test(){
  const [loading, setLoading] = useState(false)
  const handleChange = () => {
    console.log('hello')
    setLoading(prev => !prev)
    console.log(loading)
  }

  return(
    <>
      <button onClick={handleChange}>Change isLoading</button>
      <SnackBarLoading message={'Loading =)'} isLoading={loading}/>
    </>
  )
}