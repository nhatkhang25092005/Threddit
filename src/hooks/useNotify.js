import { useContext } from "react";
import { NotifyContext } from "@/provider/notify/NotifyProvider";
export function useNotify(){
  const ctx = useContext(NotifyContext)
  if(!ctx){throw new Error("useNotify must be used inside NotifyProvider")}
  return ctx.notify
}