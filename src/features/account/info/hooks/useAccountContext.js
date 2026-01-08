import { useContext } from "react";
import { AccountContext } from "../provider/context";

export default function useAccountContext(){
  return useContext(AccountContext)
}