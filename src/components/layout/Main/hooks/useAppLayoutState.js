import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchDismiss } from "../../../../features/post/components/search/hooks";
import { SEARCH_FIELD_ID } from "../../../../features/post/components/search/utils";
import { usePostContext } from "../../../../features/post/hooks";
import {
  DESKTOP_TAB_KEYS,
  HOVER_EXPAND_DELAY,
  LAYOUT_TABS,
  MOBILE_TAB_KEYS,
  SIDEBAR_WIDTH,
} from "../constants";
import { scrollMainToTop } from "../mainScroll.utils";
import { useMenu } from "./useMenu";

export function useAppLayoutState() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const location = useLocation()
  const { actions, selector } = usePostContext()
  const menuTasks = useMenu()
  const [expand, setExpand] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const hoverTime = useRef(null)
  const previousPathnameRef = useRef(location.pathname)
  const searchFieldRef = useRef(null)
  const searchTriggerRef = useRef(null)
  const isSearchLoading = selector.loading.getSearchFetchingLoading()
  const hasSearchValue = searchValue.trim().length > 0

  const desktopTabs = useMemo(
    () => DESKTOP_TAB_KEYS.map((key) => LAYOUT_TABS[key]),
    []
  )
  const mobileTabs = useMemo(
    () => MOBILE_TAB_KEYS.map((key) => LAYOUT_TABS[key]),
    []
  )

  const currentTab = useMemo(() => {
    const matchedTab = Object.values(LAYOUT_TABS).find(
      (tab) => tab.path && location.pathname.startsWith(tab.path)
    )

    return matchedTab?.value ?? null
  }, [location.pathname])

  const isProfilePage = currentTab === LAYOUT_TABS.profile.value
  const isReelPage = currentTab === LAYOUT_TABS.stories.value
  const useHoverSidebar = !isMobile && (isProfilePage || isReelPage)
  const isSidebarExpanded = !isMobile && (!useHoverSidebar || expand)
  const sidebarWidth = isSidebarExpanded
    ? SIDEBAR_WIDTH.expanded
    : SIDEBAR_WIDTH.collapsed

  const clearHoverTimer = useCallback(() => {
    clearTimeout(hoverTime.current)
  }, [])

  const closeSearch = useCallback(
    ({ collapse = false } = {}) => {
      clearHoverTimer()
      setIsSearchOpen(false)
      if (collapse && useHoverSidebar) {
        setExpand(false)
      }
    },
    [clearHoverTimer, useHoverSidebar]
  )

  const openSearch = useCallback(() => {
    clearHoverTimer()
    if (useHoverSidebar) {
      setExpand(true)
    }
    setIsSearchOpen(true)
  }, [clearHoverTimer, useHoverSidebar])

  const toggleSearch = useCallback(() => {
    if (isSearchOpen) {
      closeSearch({ collapse: true })
      return
    }

    openSearch()
  }, [closeSearch, isSearchOpen, openSearch])

  const collapseRail = useCallback(() => {
    clearHoverTimer()
    if (useHoverSidebar && !isSearchOpen) {
      setExpand(false)
    }
  }, [clearHoverTimer, isSearchOpen, useHoverSidebar])

  const navigateToTab = useCallback(
    (tab) => {
      if (!tab) {
        collapseRail()
        return
      }

      if (tab.value === LAYOUT_TABS.search.value) {
        toggleSearch()
        return
      }

      closeSearch({ collapse: true })

      if (tab.value === LAYOUT_TABS.notification.value || tab.isStatic || !tab.path) {
        collapseRail()
        return
      }

      navigate(tab.path)
    },
    [closeSearch, collapseRail, navigate, toggleSearch]
  )

  const handleSearchChange = useCallback((event) => {
    setSearchValue(event.target.value)
  }, [])

  const searchQueryFromUrl = useMemo(() => {
    if (!location.pathname.startsWith(LAYOUT_TABS.search.path)) {
      return ""
    }

    return new URLSearchParams(location.search).get("q")?.trim() ?? ""
  }, [location.pathname, location.search])

  const handleSearchSubmit = useCallback(async () => {
    const keyword = searchValue.trim()

    if (!keyword || isSearchLoading) return null

    setSearchValue(keyword)
    const responsePromise = actions.searchContent(keyword)
    closeSearch()
    navigate(`${LAYOUT_TABS.search.path}?q=${encodeURIComponent(keyword)}`)

    return responsePromise
  }, [actions, closeSearch, isSearchLoading, navigate, searchValue])

  const handleSidebarMouseEnter = useCallback(() => {
    if (!useHoverSidebar) return

    clearHoverTimer()
    hoverTime.current = setTimeout(() => {
      setExpand(true)
    }, HOVER_EXPAND_DELAY)
  }, [clearHoverTimer, useHoverSidebar])

  useEffect(() => {
    return () => {
      clearHoverTimer()
    }
  }, [clearHoverTimer])

  useSearchDismiss({
    isOpen: isSearchOpen,
    onClose: closeSearch,
    fieldRef: searchFieldRef,
    triggerRef: searchTriggerRef,
  })

  useEffect(() => {
    if (isMobile) {
      setExpand(false)
    }
  }, [isMobile])

  useEffect(() => {
    if (!searchQueryFromUrl) return

    setSearchValue((currentValue) =>
      currentValue === searchQueryFromUrl ? currentValue : searchQueryFromUrl
    )
  }, [searchQueryFromUrl])

  useEffect(() => {
    if (useHoverSidebar) {
      setExpand(false)
    }
  }, [useHoverSidebar])

  useEffect(() => {
    const previousPathname = previousPathnameRef.current
    const isNavigatingFromReel = previousPathname.startsWith(LAYOUT_TABS.stories.path)
    const isNavigatingToProfile = location.pathname.startsWith(LAYOUT_TABS.profile.path)

    previousPathnameRef.current = location.pathname

    if (!isNavigatingFromReel || !isNavigatingToProfile) return

    const frameId = window.requestAnimationFrame(() => {
      scrollMainToTop()
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [location.pathname])

  useEffect(() => {
    setIsSearchOpen(false)
  }, [location.pathname])

  return {
    currentTab,
    desktopTabs,
    mobileTabs,
    hasSearchValue,
    handleSearchChange,
    handleSearchSubmit,
    handleSidebarMouseEnter,
    isMobile,
    isSearchLoading,
    isSearchOpen,
    isSidebarExpanded,
    location,
    menuTasks,
    navigateToTab,
    openSearch,
    closeSearch,
    collapseRail,
    searchFieldId: SEARCH_FIELD_ID,
    searchFieldRef,
    searchTriggerRef,
    searchValue,
    sidebarWidth,
    tabs: LAYOUT_TABS,
    useHoverSidebar,
  }
}
