import { useCallback } from "react";
import {orchestrate} from "../../../utils/orchestrate"
export function useOrchestrate(){

  const orchestrateAddFriend = useCallback((friendApi, profileApi, service) => {
    if(typeof service !== 'function'){
      throw new Error('service must be a function that returns a promise')
    }
    return orchestrate({
      service:service,
      onSuccess:[
        ...friendApi,
        ...profileApi
      ]
    })
  }, [])

  return {
    orchestrateAddFriend
  }
  
}