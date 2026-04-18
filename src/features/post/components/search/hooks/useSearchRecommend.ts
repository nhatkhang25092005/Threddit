import { useState, useMemo, useEffect } from "react"
import { useSafeRequest } from "@/hooks/useSafeRequest"
import type {
  UseSearchRecommendOptions,
  SearchRecommendState
} from "../types/UseSearchRecommend"
import { postService } from "@/features/post/services"

const getDataFromResponse =(
  response:{data:{users?:[] | unknown, content?:[] | unknown}},
  limit:number,
  key:"users" | 'content'
): unknown[] => {
  const items = response?.data?.[key]
  return Array.isArray(items) ? items.slice(0, limit): []
}

const initialRecommendState:SearchRecommendState = {
  visible: false,
  isLoading: false,
  users: [],
  content: [],
  empty: true,
}

export function useSearchRecommend({
  query,
  enabled = false,
  minLength = 2,
  limit = 2
}:UseSearchRecommendOptions){
  const [searchRecommendState, setSearchRecommendState] = useState<SearchRecommendState>(initialRecommendState)
  const normalizedQuery = useMemo(()=> query.trim(),[query])
  const runRequest = useSafeRequest()

  useEffect(()=>{
    if(!enabled || query.trim().length < minLength){
      setSearchRecommendState(initialRecommendState)
      return
    }
    const timer = window.setTimeout(async () => {
      setSearchRecommendState((current)=>({
        ...current,
        isLoading:true,
        visible:true
      }))

      const response = await runRequest((signal) =>
        postService.search(normalizedQuery, signal, {}, 'all')
      )

      if(!response?.success){
        setSearchRecommendState(initialRecommendState)
        return
      }

      const users = getDataFromResponse(response, limit, 'users')
      const content = getDataFromResponse(response, limit, 'content')

      setSearchRecommendState({
        visible:true,
        isLoading:false,
        users,
        content,
        empty:users.length === 0 && content.length === 0
      })
    }, 250)

    return () => window.clearTimeout(timer)
  },[enabled, query, minLength, limit, normalizedQuery, runRequest])

  return searchRecommendState
}