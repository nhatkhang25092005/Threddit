import { NotificationContext } from "../provider/context";
import { useContext } from "react";
export function useNotificationContext(){
  const context =  useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within ProfileProvider')
  }
  
  return context
}