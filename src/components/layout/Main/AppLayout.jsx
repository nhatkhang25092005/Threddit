import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "../../../assets/icons/home.svg?react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import PositionedMenu from "./components/PositionedMenu"
import { style } from "./style";
import {ThemeToggleBtn} from '../../common/button'
import Logo from '../../common/Logo'
import { routes } from "../../../constant";
import { sidebar } from "../../../constant/text/vi/sidebar.text";
import PopoverNotification from "../../../features/notification/PopoverNotification";
import {
  SearchMobileField,
  SearchPreviewField,
  SearchSidebarField,
} from "../../../features/post/components/search";
import { usePostContext } from "../../../features/post/hooks";
import { useSearchDismiss } from "../../../features/post/components/search/hooks";
import { SEARCH_FIELD_ID } from "../../../features/post/components/search/utils";
import { scrollMainToTop } from "./mainScroll.utils";
import { useMenu } from "./hooks/useMenu";

const EXTEND_WIDTH = 248
const COLLAPSE_WIDTH = 96
const DELAY = 300

export default function AppLayout({ customStyle }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [expand, setExpand] = useState(false)
  const hoverTime = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { actions, selector } = usePostContext()
  const menuTasks = useMenu()
  const previousPathnameRef = useRef(location.pathname)
  const searchFieldRef = useRef(null)
  const searchTriggerRef = useRef(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const isSearchLoading = selector.loading.getSearchFetchingLoading()
  const hasSearchValue = searchValue.trim().length > 0

  const tabs = useMemo(() => ({
    home: {
      value: "home",
      label: sidebar.tabs.home,
      path: "/app/home",
      icon: <HomeIcon />,
    },
    search: {
      value: "search",
      label: sidebar.tabs.search,
      icon: <SearchIcon />,
      path: "/app/search",
    },
    stories: {
      value: "stories",
      label: sidebar.tabs.stories,
      icon: <SmartDisplayRoundedIcon fontSize="large" />,
      path:'/app/reel',
    },
    notification: {
      value: "notification",
      label: sidebar.tabs.notification,
      path: "/app/notification",
    },
    profile: {
      value: "profile",
      label: sidebar.tabs.profile,
      path:routes.profile,
      icon: <PersonIcon fontSize="large" />,
    },
  }), [])

  const tabList = useMemo(() => (
    [tabs.home, tabs.search, tabs.stories, tabs.profile]
  ), [tabs])

  const mobileTabs = useMemo(() => (
    [tabs.home, tabs.search, tabs.notification, tabs.profile]
  ), [tabs])

  const currentTab = useMemo(() => {
    const matchedTab = Object.values(tabs).find((tab) =>
      tab.path && location.pathname.startsWith(tab.path)
    )

    return matchedTab?.value ?? null
  }, [location.pathname, tabs])

  const isProfilePage = currentTab === tabs.profile.value
  const isReelPage = currentTab === tabs.stories.value
  const useHoverSidebar = !isMobile && (isProfilePage || isReelPage)
  const isSidebarExpanded = !isMobile && (!useHoverSidebar || expand)
  const sidebarWidth = isSidebarExpanded ? EXTEND_WIDTH : COLLAPSE_WIDTH

  const clearHoverTimer = useCallback(() => {
    clearTimeout(hoverTime.current)
  }, [])

  const closeSearch = useCallback(({ collapse = false } = {}) => {
    clearHoverTimer()
    setIsSearchOpen(false)
    if (collapse && useHoverSidebar) {
      setExpand(false)
    }
  }, [clearHoverTimer, useHoverSidebar])

  const openSearch = useCallback(() => {
    clearHoverTimer()
    if (useHoverSidebar) {
      setExpand(true)
    }
    setIsSearchOpen(true)
  }, [clearHoverTimer, useHoverSidebar])

  const toggleSearch = () => {
    if (isSearchOpen) {
      closeSearch({ collapse: true })
      return
    }

    openSearch()
  }

  const collapseRail = () => {
    clearHoverTimer()
    if (useHoverSidebar && !isSearchOpen) {
      setExpand(false)
    }
  }

  const navigateToTab = (tab) => {
    if (!tab) {
      collapseRail()
      return
    }

    if (tab.value === tabs.search.value) {
      toggleSearch()
      return
    }

    closeSearch({ collapse: true })

    if (tab.value === 'notification' || tab.isStatic || !tab.path) {
      collapseRail()
      return
    }

    navigate(tab.path)
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const searchQueryFromUrl = useMemo(() => {
    if (!tabs.search.path || !location.pathname.startsWith(tabs.search.path)) {
      return ""
    }

    return new URLSearchParams(location.search).get("q")?.trim() ?? ""
  }, [location.pathname, location.search, tabs.search.path])

  const handleSearchSubmit = useCallback(async () => {
    const keyword = searchValue.trim()

    if (!keyword || isSearchLoading) return null

    setSearchValue(keyword)
    const responsePromise = actions.searchContent(keyword)
    closeSearch()
    navigate(`${tabs.search.path}?q=${encodeURIComponent(keyword)}`)

    const response = await responsePromise
    console.log("[AppLayout] searchContent response:", response)
    return response
  }, [actions, closeSearch, isSearchLoading, navigate, searchValue, tabs.search.path])

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
    if (isMobile) setExpand(false)
  }, [isMobile, setExpand])

  useEffect(() => {
    if (!searchQueryFromUrl) return

    setSearchValue((currentValue) => (
      currentValue === searchQueryFromUrl
        ? currentValue
        : searchQueryFromUrl
    ))
  }, [searchQueryFromUrl])

  useEffect(() => {
    if (useHoverSidebar) {
      setExpand(false)
    }
  }, [useHoverSidebar])

  useEffect(() => {
    const previousPathname = previousPathnameRef.current
    const isNavigatingFromReel = previousPathname.startsWith("/app/reel")
    const isNavigatingToProfile = location.pathname.startsWith("/app/profile")

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

  const renderNavButton = (tab, mobile = false) => {
    const isSearchTrigger = tab.value === tabs.search.value
    const isActive = isSearchTrigger ? isSearchOpen : currentTab === tab.value
    const isEmphasized = tab.value === "add"
    const isStatic = Boolean(tab.isStatic)

    return (
      <Box
        key={`${mobile ? "mobile" : "desktop"}-${tab.value}`}
        component="button"
        type="button"
        ref={isSearchTrigger ? searchTriggerRef : undefined}
        aria-current={!isSearchTrigger && isActive ? "page" : undefined}
        aria-label={tab.label}
        aria-controls={isSearchTrigger && isSearchOpen ? SEARCH_FIELD_ID : undefined}
        aria-expanded={isSearchTrigger ? isSearchOpen : undefined}
        aria-pressed={isSearchTrigger ? isSearchOpen : undefined}
        onClick={() => navigateToTab(tab)}
        sx={[
          mobile
            ? style.mobileNavButton(isActive, isEmphasized)
            : style.navButton(isActive, isSidebarExpanded, isEmphasized),
          isStatic
            ? {
                cursor: "default",
                "&:hover": {
                  transform: "none",
                  opacity: mobile ? 0.82 : 0.8,
                },
              }
            : null,
        ]}
      >
        <Box sx={style.navIconWrap(isActive, isEmphasized)}>
          {tab.icon}
        </Box>
        {!mobile && isSidebarExpanded ? (
          <Typography sx={style.navLabel}>{tab.label}</Typography>
        ) : null}
      </Box>
    )
  }

  const renderDesktopSearchField = () => (
    <SearchSidebarField
      key="desktop-search-field"
      id={SEARCH_FIELD_ID}
      ref={searchFieldRef}
      value={searchValue}
      onChange={handleSearchChange}
      onSubmit={handleSearchSubmit}
      onClose={closeSearch}
      isLoading={isSearchLoading}
    />
  )

  const renderDesktopSearchPreview = () => (
    <SearchPreviewField
      key="desktop-search-preview"
      value={searchValue}
      onClick={openSearch}
      active={currentTab === tabs.search.value}
    />
  )

  const renderMobileSearchField = () => (
    <SearchMobileField
      id={SEARCH_FIELD_ID}
      ref={searchFieldRef}
      value={searchValue}
      onChange={handleSearchChange}
      onSubmit={handleSearchSubmit}
      onClose={closeSearch}
      isLoading={isSearchLoading}
    />
  )

  const renderMobileSearchPreview = () => (
    <SearchPreviewField
      mobile
      value={searchValue}
      onClick={openSearch}
      active={currentTab === tabs.search.value}
    />
  )

  const renderNotificationButton = (mobile = false) => {
    const isActive = currentTab === tabs.notification.value

    if (mobile) {
      return (
        <Box
          key="mobile-notification"
          sx={style.mobileNavButton(isActive)}
        >
          <PopoverNotification
            closeReason={location.pathname === tabs.notification.path}
            disable={location.pathname === tabs.notification.path}
            onClose={collapseRail}
            badgeSx={style.notificationBadge}
            buttonSx={style.notificationButton}
          />
        </Box>
      )
    }

    return (
      <PopoverNotification
        closeReason={location.pathname === tabs.notification.path}
        disable={location.pathname === tabs.notification.path}
        onClose={collapseRail}
        badgeSx={style.notificationBadge}
        buttonSx={isSidebarExpanded ? style.utilityActionButton(isActive) : style.notificationButton}
        label={isSidebarExpanded ? sidebar.utility.notification : undefined}
        labelSx={style.utilityLabel}
      />
    )
  }

  return (
    <Box sx={(currentTheme) => style.shell(currentTheme)}>
      {!isMobile ? (
        <>
          <Paper
            component="aside"
            variant="navigate"
            sx={[
              style.sidebar(isSidebarExpanded),
              { width: `${sidebarWidth}px` },
              customStyle,
            ]}
            onMouseEnter={() => {
              if (!useHoverSidebar) return
              clearHoverTimer()
              hoverTime.current = setTimeout(() => {
                setExpand(true)
              }, DELAY)
            }}
            onMouseLeave={collapseRail}
          >
            <Box sx={style.sidebarInner}>
              <Box sx={style.brandBlock(isSidebarExpanded)}>
                <Logo size="normal" sx={style.logo} />
                {isSidebarExpanded ? (
                  <Box>
                    <Typography sx={style.brandTitle}>{sidebar.brand.title}</Typography>
                    <Typography sx={(currentTheme) => style.brandSubtitle(currentTheme)}>
                      {sidebar.brand.subtitle}
                    </Typography>
                  </Box>
                ) : null}
              </Box>

              <Box sx={style.navSection}>
                {tabList.map((tab) => (
                  tab.value === tabs.search.value
                    ? isSearchOpen
                      ? renderDesktopSearchField()
                      : hasSearchValue
                        ? renderDesktopSearchPreview()
                        : renderNavButton(tab)
                    : renderNavButton(tab)
                ))}
              </Box>

              <Box sx={style.sidebarFooter}>
                {renderNotificationButton()}

                <ThemeToggleBtn
                  sx={isSidebarExpanded ? style.utilityActionButton() : style.utilityIconButton}
                  label={isSidebarExpanded ? sidebar.utility.theme : undefined}
                  labelSx={style.utilityLabel}
                  iconWrapSx={style.utilityActionIconWrap}
                />

                <PositionedMenu
                  tasks={menuTasks}
                  onClose={collapseRail}
                  icon={MoreHorizRoundedIcon}
                  buttonSx={isSidebarExpanded ? style.utilityActionButton() : style.utilityIconButton}
                  label={isSidebarExpanded ? sidebar.utility.account : undefined}
                  labelSx={style.utilityLabel}
                  iconWrapSx={style.utilityActionIconWrap}
                />
              </Box>
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <Box sx={style.mobileUtilityBar}>
            <ThemeToggleBtn sx={(currentTheme) => style.utilityIconButton(currentTheme)} />
            <PositionedMenu
              tasks={menuTasks}
              onClose={collapseRail}
              icon={MoreHorizRoundedIcon}
              buttonSx={(currentTheme) => style.utilityIconButton(currentTheme)}
            />
          </Box>

          <Paper component="nav" variant="navigate" sx={(currentTheme) => style.mobileDock(currentTheme)}>
            <Box sx={style.mobileDockInner}>
              {mobileTabs.map((tab) => (
                tab.value === "notification"
                  ? renderNotificationButton(true)
                  : renderNavButton(tab, true)
              ))}
            </Box>
          </Paper>
          {isSearchOpen ? renderMobileSearchField() : hasSearchValue ? renderMobileSearchPreview() : null}
        </>
      )}

      <Box component="main" sx={(currentTheme) => style.main(currentTheme)}>
        <Box sx={style.contentWrap(isMobile)}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
