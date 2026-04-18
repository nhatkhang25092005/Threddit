import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import { Box, Paper, Typography } from "@mui/material";
import { sidebar } from "../../../../constant/text/vi/sidebar.text";
import { useTextLocale } from "../../../../constant/text/runtime/useTextLocale";
import PopoverNotification from "../../../../features/notification/PopoverNotification";
import {
  DesktopSidebarSearchSlot,
} from "../../../../features/post/components/search";
import { ThemeToggleBtn } from "../../../common/button";
import Logo from "../../../common/Logo";
import PositionedMenu from "./PositionedMenu";
import NavButton from "./NavButton";
import { style } from "../style";

export default function DesktopSidebar({ controller, customStyle }) {
  const { nextLocale, toggleLocale } = useTextLocale()
  const {
    collapseRail,
    currentTab,
    desktopTabs,
    handleSidebarMouseEnter,
    isSidebarExpanded,
    location,
    menuTasks,
    navigateToTab,
    search,
    sidebarWidth,
    tabs,
  } = controller

  return (
    <Paper
      component="aside"
      variant="navigate"
      sx={[
        style.sidebar(isSidebarExpanded),
        { width: `${sidebarWidth}px` },
        customStyle,
      ]}
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={collapseRail}
    >
      <Box sx={style.sidebarInner}>
        <Box sx={style.brandBlock(isSidebarExpanded)}>
          <Logo size={isSidebarExpanded ? "normal" : "small"} sx={style.logo} />
        </Box>

        <Box sx={style.navSection}>
          {desktopTabs.map((tab) => {
            if (tab.value !== tabs.search.value) {
              return (
                <NavButton
                  key={`desktop-${tab.value}`}
                  active={currentTab === tab.value}
                  expanded={isSidebarExpanded}
                  onClick={() => navigateToTab(tab)}
                  tab={tab}
                />
              )
            }

            return (
              <DesktopSidebarSearchSlot
                key={`desktop-${tab.value}`}
                active={currentTab === tabs.search.value}
                search={search}
                renderTrigger={({ buttonRef, searchFieldId, searchOpen }) => (
                  <NavButton
                    active={searchOpen}
                    buttonRef={buttonRef}
                    expanded={isSidebarExpanded}
                    onClick={() => navigateToTab(tab)}
                    searchFieldId={searchFieldId}
                    searchOpen={searchOpen}
                    searchTrigger
                    tab={tab}
                  />
                )}
              />
            )
          })}
        </Box>

        <Box sx={style.sidebarFooter(isSidebarExpanded)}>
          <PopoverNotification
            closeReason={location.pathname === tabs.notification.path}
            disable={location.pathname === tabs.notification.path}
            onClose={collapseRail}
            badgeSx={style.notificationBadge}
            buttonSx={
              isSidebarExpanded
                ? style.utilityActionButton(currentTab === tabs.notification.value)
                : style.notificationButton(currentTab === tabs.notification.value)
            }
            label={isSidebarExpanded ? sidebar.utility.notification : undefined}
            labelSx={style.utilityLabel(currentTab === tabs.notification.value)}
          />

          <Box
            component="button"
            type="button"
            aria-label={sidebar.utility.language}
            title={`${sidebar.utility.language} (${nextLocale.toUpperCase()})`}
            onClick={toggleLocale}
            sx={
              isSidebarExpanded
                ? style.utilityActionButton()
                : style.utilityIconButton()
            }
          >
            <Box sx={style.utilityActionIconWrap}>
              <TranslateRoundedIcon />
            </Box>
            {isSidebarExpanded ? (
              <Typography sx={style.utilityLabel()}>
                {sidebar.utility.language}
              </Typography>
            ) : null}
          </Box>

          <ThemeToggleBtn
            sx={isSidebarExpanded ? style.utilityActionButton() : style.utilityIconButton()}
            label={isSidebarExpanded ? sidebar.utility.theme : undefined}
            labelSx={style.utilityLabel()}
            iconWrapSx={style.utilityActionIconWrap}
          />

          <PositionedMenu
            tasks={menuTasks}
            onClose={collapseRail}
            icon={MoreHorizRoundedIcon}
            buttonSx={isSidebarExpanded ? style.utilityActionButton() : style.utilityIconButton()}
            label={isSidebarExpanded ? sidebar.utility.account : undefined}
            labelSx={style.utilityLabel()}
            iconWrapSx={style.utilityActionIconWrap}
          />
        </Box>
      </Box>
    </Paper>
  )
}
