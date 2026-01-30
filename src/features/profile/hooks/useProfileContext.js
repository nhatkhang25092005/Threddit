import { ProfileContext } from "../provider/context";
import { useContext } from "react";
export function useProfileContext(){
  const context =  useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfileContext must be used within ProfileProvider')
  }
  
  return context
}