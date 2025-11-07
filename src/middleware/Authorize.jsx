import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

// Check if login, redirect to app
export default function Authorize() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('accessToken')
    console.log("hello from Authorize",token)
    if(token) navigate("/app/profile") 
    else navigate("/auth/login")
  }, [navigate]);

  return null;
}
