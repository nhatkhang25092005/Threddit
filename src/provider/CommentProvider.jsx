import { useEffect, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";

const CommentContext = createContext()

export default function CommentProvider({children}){
    const {postId} = useParams()
    const [realTimeComments, setRealTimeComments] = useState({})
    const [isConnected, setIsConnected] = useState(false)
    useEffect(()=>{
        if(!postId){return}
        const eventSource = new EventSource(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_POST + `/${postId}` + import.meta.env.VITE_API_LISTEN_COMMENT,{withCredentials: true})
        
        eventSource.onopen = () => {setIsConnected(true)}

        eventSource.onmessage = (event)=>{
            try{
                console.log("Listened data")
                const data = JSON.parse(event.data)
                setRealTimeComments(data)
            }
            catch(err){
                console.error('Error parsing notification data:', err?.message || String(err))
            }
        }
        
        eventSource.onerror = (e) => {
            console.error("EventSource failed:",e)
            eventSource.close()
        }

        return () => {
            eventSource.close()
            setIsConnected(false)
            setRealTimeComments([])
        }
    },[postId])

    const value = {realTimeComments, setRealTimeComments, isConnected}

    return(
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    )
}

export function useRealtimeComments() {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('useRealtimeComments must be used within CommentProvider');
    }
    return context;
}
