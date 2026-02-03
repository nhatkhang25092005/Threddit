import { useContext } from "react";
import {AuthContext} from '../provider/AuthProvider'

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('AuthContext must be in a AuthProvider')
  return ctx
}
