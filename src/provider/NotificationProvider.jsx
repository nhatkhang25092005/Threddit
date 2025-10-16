import { useEffect, useState } from "react";
import NotificationContext from "../context/NotificationContext";
import { handleGetUnreadNotification } from "../services/request/notificationRequest";
export default function NotificationProvider({children}){
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [realTimeList, setRealTimeList] = useState([])

    // get unread
    useEffect(()=>{
        let isMounted = true
        async function getUnreadNotification(){
            const response = await handleGetUnreadNotification()
            if(isMounted){setCount(response.data)}
            setLoading(false)
        }
        getUnreadNotification()
        return ()=>{isMounted = false}
    },[])

    // listener
    useEffect(() => {
        if(loading) return
        const eventSource = new EventSource(import.meta.env.VITE_API_NOTIFICATION_LISTENER, {withCredentials: true})
        eventSource.onmessage = (event) => {
            try{ 
                console.log("Event =)",event.data)
                const data = JSON.parse(event.data)
                setCount((prev)=>prev + 1)
                setRealTimeList((prev) => [...prev, data])
            }
            catch(err){
                console.error('Error parsing notification data:', err)
            }
        }

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    },[loading])

    /**
     * mark as read later
     */

    if(loading) return null

    return (
        <NotificationContext.Provider value={{count, setCount, realTimeList}}>
            {children}
        </NotificationContext.Provider>
    )
}
