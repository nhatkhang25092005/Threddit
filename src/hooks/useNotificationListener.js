import {useEffect, useState} from 'react'
import {useNotificationContext} from './useNotificationContext'
export default function useNotificationListener(){
    const [notification, setNotification] = useState([])

    const {setCount} = useNotificationContext()


    useEffect(() => {
        const eventSource = new EventSource(import.meta.env.VITE_API_NOTIFICATION_LISTENER, {withCredentials: true})
        eventSource.onmessage = (event) => {
            try{
                const data = JSON.parse(event.data)
                setCount((prev)=>prev + 1)
                setNotification((prev) => [...prev, data])
            }
            catch(err){
                console.error('Error parsing notification data:', err)
            }
        }

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err)
            eventSource.close()
        }
        
        console.log("hello")
        return () => {
            eventSource.close()
        }
    },[])

    return notification
}