import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Box, Paper } from "@mui/material";
import PopoverNotification from "../../../../features/notification/PopoverNotification";
import {
  MobileNavigationSearchContent,
} from "../../../../features/post/components/search";
import { ThemeToggleBtn } from "../../../common/button";
import PositionedMenu from "./PositionedMenu";
import NavButton from "./NavButton";
import { style } from "../style";

export default function MobileNavigation({ controller }) {
  const {
    collapseRail,
    currentTab,
    location,
    menuTasks,
    mobileTabs,
    navigateToTab,
    search,
    tabs,
  } = controller

  return (
    <>
      <Box sx={style.mobileUtilityBar}>
        <ThemeToggleBtn sx={style.utilityIconButton()} />
        <PositionedMenu
          tasks={menuTasks}
          onClose={collapseRail}
          icon={MoreHorizRoundedIcon}
          buttonSx={style.utilityIconButton()}
        />
      </Box>

      <Paper component="nav" variant="navigate" sx={(currentTheme) => style.mobileDock(currentTheme)}>
        <Box sx={style.mobileDockInner}>
          {mobileTabs.map((tab) => {
            if (tab.value === tabs.notification.value) {
              return (
                <Box key="mobile-notification" sx={style.mobileNavButton(currentTab === tabs.notification.value)}>
                  <PopoverNotification
                    closeReason={location.pathname === tabs.notification.path}
                    disable={location.pathname === tabs.notification.path}
                    onClose={collapseRail}
                    badgeSx={style.notificationBadge}
                    buttonSx={style.notificationButton(currentTab === tabs.notification.value)}
                  />
                </Box>
              )
            }

            return (
              <NavButton
                key={`mobile-${tab.value}`}
                active={tab.value === tabs.search.value ? search.isOpen : currentTab === tab.value}
                mobile
                onClick={() => navigateToTab(tab)}
                searchFieldId={search.fieldId}
                searchOpen={search.isOpen}
                searchTrigger={tab.value === tabs.search.value}
                tab={tab}
              />
            )
          })}
        </Box>
      </Paper>

      <MobileNavigationSearchContent
        active={currentTab === tabs.search.value}
        search={search}
      />
    </>
  )
}
