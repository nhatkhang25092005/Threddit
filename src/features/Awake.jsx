import awake from "../services/api/awake";
import { useEffect } from "react";
export default function Awake(){
    useEffect(() => {
    const interval = setInterval(() => {
        awake()
        .then(console.log("Waky Waky, Time to code"))
        .catch((err) => console.error("WTF?? Error occurs 0> :", err));
    }, 45000);

    return () => clearInterval(interval);
  }, [])
    return(<>
    </>)
}