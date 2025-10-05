import { useState, useEffect } from "react";

/**
 * useAuth Hook
 * ------------
 * Checks if user is authenticated via cookies.
 * 
 * Uses document.cookie to check if a token/session cookie exists.
 * You can replace "token" with your actual cookie name (e.g. "access_token").
 */

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token); 
    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
}
