import { PostSearchContext } from "./PostSearchContext"
import type { SearchRecommendState } from "./UseSearchRecommend"

export interface UseLayoutSearchControllerOptions {
  allowHoverSidebar?:boolean
  clearHoverTimer?: () => void
  collapseSidebar?: () => void
  expandSidebar?: () => void
  searchPath:string
  recommend:SearchRecommendState
}

export type SearchSubmitResult =
| Awaited<ReturnType<PostSearchContext['actions']['searchContent']>>
| null

export type SearchSubmitHandler = () => Promise<SearchSubmitResult>
