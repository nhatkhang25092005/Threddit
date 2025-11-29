import { useEffect, useState } from "react";
import NotificationContext from "../context/NotificationContext";
import { handleGetUnreadNotification,handleMarkReadNotificationRequest } from "../services/request/notificationRequest";
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
                if(window.location.pathname === "/app/notification") setRealTimeList((prev) => [...prev, data])
            }
            catch(err){
                console.error('Error parsing notification data:', err?.message || String(err))
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
     * Mark notification as read with provided id
     * @param {int} id 
     */
    async function readNotification(id){
        const response = await handleMarkReadNotificationRequest(id)
        if(response.isOk()){ console.log("Mark as read:", response) }
        if(!response.isOk()){ console.error(response) }
        setCount(prev => prev-1)
    }

    if(loading) return null

    return (
        <NotificationContext.Provider value={{setRealTimeList, count, setCount, realTimeList, readNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}
