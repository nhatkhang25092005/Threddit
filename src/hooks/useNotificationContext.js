import { useContext } from "react";
import  NotificationContext  from "../context/NotificationContext";

export function useNotificationContext(){
    return useContext(NotificationContext)
}