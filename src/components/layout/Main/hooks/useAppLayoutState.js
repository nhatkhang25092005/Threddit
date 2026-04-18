import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutSearchController } from "../../../../features/post/components/search/hooks";
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
  const menuTasks = useMenu()
  const [expand, setExpand] = useState(false)
  const hoverTime = useRef(null)
  const previousPathnameRef = useRef(location.pathname)

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

  const collapseExpandedRail = useCallback(() => {
    setExpand(false)
  }, [])

  const expandRail = useCallback(() => {
    setExpand(true)
  }, [])

  const search = useLayoutSearchController({
    allowHoverSidebar: useHoverSidebar,
    clearHoverTimer,
    collapseSidebar: collapseExpandedRail,
    expandSidebar: expandRail,
    searchPath: LAYOUT_TABS.search.path,
  })

  const collapseRail = useCallback(() => {
    clearHoverTimer()
    if (useHoverSidebar && !search.isOpen) {
      collapseExpandedRail()
    }
  }, [clearHoverTimer, collapseExpandedRail, search.isOpen, useHoverSidebar])

  const navigateToTab = useCallback(
    (tab) => {
      if (!tab) {
        collapseRail()
        return
      }

      if (tab.value === LAYOUT_TABS.search.value) {
        search.toggle()
        return
      }

      search.close({ collapse: true })

      if (tab.value === LAYOUT_TABS.notification.value || tab.isStatic || !tab.path) {
        collapseRail()
        return
      }

      navigate(tab.path)
    },
    [collapseRail, navigate, search]
  )

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

  useEffect(() => {
    if (isMobile) {
      collapseExpandedRail()
    }
  }, [collapseExpandedRail, isMobile])

  useEffect(() => {
    if (useHoverSidebar) {
      collapseExpandedRail()
    }
  }, [collapseExpandedRail, useHoverSidebar])

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

  return {
    currentTab,
    desktopTabs,
    mobileTabs,
    handleSidebarMouseEnter,
    isMobile,
    isSidebarExpanded,
    location,
    menuTasks,
    navigateToTab,
    collapseRail,
    search,
    sidebarWidth,
    tabs: LAYOUT_TABS,
    useHoverSidebar,
  }
}
