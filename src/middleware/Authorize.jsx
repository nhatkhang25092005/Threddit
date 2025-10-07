import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Authorize() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => navigate("/auth/login");
    window.addEventListener("unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
    };
  }, [navigate]);

  return null;
}
