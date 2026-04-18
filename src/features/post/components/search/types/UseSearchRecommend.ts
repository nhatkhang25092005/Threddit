export interface UseSearchRecommendOptions{
  query:string
  enabled:boolean
  minLength?:number
  limit?:number
}

export interface SearchRecommendState<TUser = unknown, TContent = unknown> {
  visible:boolean
  isLoading:boolean
  users:TUser[]
  content:TContent[]
  empty:boolean
}