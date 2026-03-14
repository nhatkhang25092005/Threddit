import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "../../../assets/icons/home.svg?react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import AddIcon from "../../../assets/icons/plus.svg?react";
import PositionedMenu from "./components/PositionedMenu"
import { style } from "./style";
import {ThemeToggleBtn} from '../../common/button'
import Logo from '../../common/Logo'
import { routes } from "../../../constant";
import PopoverNotification from "../../../features/notification/PopoverNotification";
import { useMenu } from "./hooks/useMenu";

const EXTEND_WIDTH = 248
const COLLAPSE_WIDTH = 96
const DELAY = 300

const useHoverEffect = () => {
  const [expand, setExpand] = useState(false)
  const hoverTime = useRef(null)
  return {
    expand, setExpand, hoverTime
  }
}

export default function AppLayout({ customStyle }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const {expand, setExpand, hoverTime} = useHoverEffect()
  const navigate = useNavigate();
  const location = useLocation();
  const menuTasks = useMenu()

  const tabs = useMemo(() => ({
    home: {
      value: "home",
      label: "Trang chu",
      path: "/app/home",
      icon: <HomeIcon />,
    },
    search: {
      value: "search",
      label: "Tim kiem",
      path: "/app/search",
      icon: <SearchIcon />,
    },
    add: {
      value: "add",
      label: "Tao bai",
      path: "/app/add",
      icon: <AddIcon />,
    },
    notification: {
      value: "notification",
      label: "Thong bao",
      path: "/app/notification",
    },
    profile: {
      value: "profile",
      label: "Ho so",
      path:routes.profile,
      icon: <PersonIcon fontSize="large" />,
    },
  }), [])

  const tabList = useMemo(() => (
    [tabs.home, tabs.search, tabs.add, tabs.profile]
  ), [tabs])

  const mobileTabs = useMemo(() => (
    [tabs.home, tabs.search, tabs.add, tabs.notification, tabs.profile]
  ), [tabs])

  const currentTab = useMemo(() => {
    const matchedTab = Object.values(tabs).find((tab) =>
      location.pathname.startsWith(tab.path)
    )

    return matchedTab?.value ?? null
  }, [location.pathname, tabs])

  const sidebarWidth = !isMobile && expand ? EXTEND_WIDTH : COLLAPSE_WIDTH

  const collapseRail = () => {
    clearTimeout(hoverTime.current)
    setExpand(false)
  }

  const navigateToTab = (tab) => {
    if (!tab || tab.value === 'notification') {
      collapseRail()
      return
    }

    navigate(tab.path)
  }

  useEffect(() => {
    return () => {
      clearTimeout(hoverTime.current)
    }
  }, [hoverTime])

  useEffect(() => {
    if (isMobile) setExpand(false)
  }, [isMobile, setExpand])

  const renderNavButton = (tab, mobile = false) => {
    const isActive = currentTab === tab.value
    const isEmphasized = tab.value === "add"

    return (
      <Box
        key={`${mobile ? "mobile" : "desktop"}-${tab.value}`}
        component="button"
        type="button"
        aria-current={isActive ? "page" : undefined}
        aria-label={tab.label}
        onClick={() => navigateToTab(tab)}
        sx={
          mobile
            ? style.mobileNavButton(isActive, isEmphasized)
            : style.navButton(isActive, expand, isEmphasized)
        }
      >
        <Box sx={style.navIconWrap(isActive, isEmphasized)}>
          {tab.icon}
        </Box>
        {!mobile && expand ? (
          <Typography sx={style.navLabel}>{tab.label}</Typography>
        ) : null}
      </Box>
    )
  }

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
      <Box sx={style.utilityRow(expand, isActive)}>
        <PopoverNotification
          closeReason={location.pathname === tabs.notification.path}
          disable={location.pathname === tabs.notification.path}
          onClose={collapseRail}
          badgeSx={style.notificationBadge}
          buttonSx={style.notificationButton}
        />
        {expand ? <Typography sx={style.utilityLabel}>Thong bao</Typography> : null}
      </Box>
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
              style.sidebar(expand),
              { width: `${sidebarWidth}px` },
              customStyle,
            ]}
            onMouseEnter={() => {
              clearTimeout(hoverTime.current)
              hoverTime.current = setTimeout(() => {
                setExpand(true)
              }, DELAY)
            }}
            onMouseLeave={collapseRail}
          >
            <Box sx={style.sidebarInner}>
              <Box sx={style.brandBlock(expand)}>
                <Logo size="normal" sx={style.logo} />
                {expand ? (
                  <Box>
                    <Typography sx={style.brandTitle}>Threddit</Typography>
                    <Typography sx={(currentTheme) => style.brandSubtitle(currentTheme)}>
                      Khong gian cua ban
                    </Typography>
                  </Box>
                ) : null}
              </Box>

              <Box sx={style.navSection}>
                {tabList.map((tab) => renderNavButton(tab))}
              </Box>

              <Box sx={style.sidebarFooter}>
                {renderNotificationButton()}

                <Box sx={style.utilityRow(expand)}>
                  <ThemeToggleBtn sx={(currentTheme) => style.utilityIconButton(currentTheme)} />
                  {expand ? <Typography sx={(currentTheme) => style.utilityLabel(currentTheme)}>Giao dien</Typography> : null}
                </Box>

                <Box sx={style.utilityRow(expand)}>
                  <PositionedMenu
                    tasks={menuTasks}
                    onClose={collapseRail}
                    icon={MoreHorizRoundedIcon}
                    buttonSx={(currentTheme) => style.utilityIconButton(currentTheme)}
                  />
                  {expand ? <Typography sx={(currentTheme) => style.utilityLabel(currentTheme)}>Tai khoan</Typography> : null}
                </Box>
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
        </>
      )}

      <Box component="main" sx={(currentTheme) => style.main(currentTheme)}>
        <Box sx={style.contentWrap(isMobile)}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
