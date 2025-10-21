import { createContext } from "react";
const NotificationContext = createContext(
    {
        realTimeList:[],
        count:0,
        setCount:()=>{},
        readNotification : () => {}
    }
)
export default NotificationContext

