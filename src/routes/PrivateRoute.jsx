/**
 * This component is used for check if user was log in or not
 * If not, redirect user to /auth/login
 * @returns 
 */
import { Outlet } from "react-router-dom"
export default function PrivateRoute(){
    {/* useAuth() is get user info method that will be build later */}
    {/* const {user} = useAuth() 
        return user ? <Outlet/> : <Navigate to ="/auth/login" replace/>
    */}
    return(<Outlet/>)
}