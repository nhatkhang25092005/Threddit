import { useEffect, useState } from "react";
import NotificationContext from "../context/NotificationContext";
import { handleGetUnreadNotification } from "../services/request/notificationRequest";
export default function NotificationProvider({children}){
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        let isMounted = true
        async function getUnreadNotification(){
            const response = await handleGetUnreadNotification()
            console.log(response)
            if(isMounted){setCount(response.data)}
            setLoading(false)
        }
        getUnreadNotification()
        return ()=>{isMounted = false}
    },[])

    if(loading) return null

    return (
        <NotificationContext.Provider value={{count, setCount}}>
            {children}
        </NotificationContext.Provider>
    )
}
