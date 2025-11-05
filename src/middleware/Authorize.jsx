import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authorize() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token) navigate("/app/profile") 
    else navigate("/auth/login")
  }, [navigate]);

  return null;
}
