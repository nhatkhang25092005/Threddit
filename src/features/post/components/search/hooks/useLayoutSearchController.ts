import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostContext } from "../../../hooks";
import { createLayoutSearchController } from "./layoutSearchController.utils";
import useLayoutSearchValueState from "./useLayoutSearchValueState";
import useLayoutSearchVisibilityState from "./useLayoutSearchVisibilityState";
import useSearchDismiss from "./useSearchDismiss";
import type {
  UseLayoutSearchControllerOptions,
  SearchSubmitHandler,
} from "../types/UseLayoutSearchController";
import type { PostSearchContext } from "../types/PostSearchContext";
import { useSearchRecommend } from "./useSearchRecommend";

export default function useLayoutSearchController({
  allowHoverSidebar = false,
  clearHoverTimer,
  collapseSidebar,
  expandSidebar,
  searchPath,
}: UseLayoutSearchControllerOptions) {
  const navigate = useNavigate()
  const location = useLocation()
  const { actions, selector } = usePostContext() as PostSearchContext
  const fieldRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dismissRefs = useMemo(() => [fieldRef, triggerRef], [])
  const isLoading = selector.loading.getSearchFetchingLoading()
  const {
    handleChange,
    hasValue,
    query,
    setValue,
    value,
  } = useLayoutSearchValueState({
    pathname: location.pathname,
    searchPath,
    search: location.search,
  })
  
  const {
    close,
    isOpen,
    open,
    setIsOpen,
    toggle,
  } = useLayoutSearchVisibilityState({
    allowHoverSidebar,
    clearHoverTimer,
    collapseSidebar,
    expandSidebar,
  })

  const recommend = useSearchRecommend({
    query:value,
    enabled:isOpen,
    minLength:2,
    limit:2
  })

  const submitSearchQuery = useCallback(async (nextQuery) => {
    const normalizedQuery = typeof nextQuery === "string"
      ? nextQuery.trim()
      : ""

    if (!normalizedQuery || isLoading) return null

    setValue(normalizedQuery)
    const responsePromise = actions.searchContent(normalizedQuery)
    close()
    navigate(`${searchPath}?q=${encodeURIComponent(normalizedQuery)}`)

    return responsePromise
  }, [actions, close, isLoading, navigate, searchPath, setValue])

  const handleSubmit = useCallback<SearchSubmitHandler>(() => (
    submitSearchQuery(query)
  ), [query, submitSearchQuery])

  const handleRecommendSelect = useCallback((selectedQuery) => (
    submitSearchQuery(selectedQuery)
  ), [submitSearchQuery])

  useSearchDismiss({
    isOpen,
    onClose: close,
    refs: dismissRefs,
  })

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, setIsOpen])

  return useMemo(() => createLayoutSearchController({
    close,
    fieldRef,
    handleChange,
    handleSubmit,
    hasValue,
    isLoading,
    isOpen,
    open,
    query,
    toggle,
    triggerRef,
    value,
    recommend,
    handleRecommendSelect,
  }), [
    close,
    fieldRef,
    handleChange,
    handleSubmit,
    hasValue,
    isLoading,
    isOpen,
    open,
    query,
    recommend,
    toggle,
    triggerRef,
    value,
    handleRecommendSelect,
  ])
}
