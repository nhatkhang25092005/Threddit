import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Box, Paper } from "@mui/material";
import PopoverNotification from "../../../../features/notification/PopoverNotification";
import {
  SearchMobileField,
  SearchPreviewField,
} from "../../../../features/post/components/search";
import { ThemeToggleBtn } from "../../../common/button";
import PositionedMenu from "./PositionedMenu";
import NavButton from "./NavButton";
import { style } from "../style";

export default function MobileNavigation({ controller }) {
  const {
    closeSearch,
    collapseRail,
    currentTab,
    handleSearchChange,
    handleSearchSubmit,
    hasSearchValue,
    isSearchLoading,
    isSearchOpen,
    location,
    menuTasks,
    mobileTabs,
    navigateToTab,
    openSearch,
    searchFieldId,
    searchFieldRef,
    searchValue,
    tabs,
  } = controller

  return (
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
          {mobileTabs.map((tab) => {
            if (tab.value === tabs.notification.value) {
              return (
                <Box key="mobile-notification" sx={style.mobileNavButton(currentTab === tabs.notification.value)}>
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
              <NavButton
                key={`mobile-${tab.value}`}
                active={tab.value === tabs.search.value ? isSearchOpen : currentTab === tab.value}
                mobile
                onClick={() => navigateToTab(tab)}
                searchFieldId={searchFieldId}
                searchOpen={isSearchOpen}
                searchTrigger={tab.value === tabs.search.value}
                tab={tab}
              />
            )
          })}
        </Box>
      </Paper>

      {isSearchOpen ? (
        <SearchMobileField
          id={searchFieldId}
          ref={searchFieldRef}
          value={searchValue}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          onClose={() => closeSearch()}
          isLoading={isSearchLoading}
        />
      ) : hasSearchValue ? (
        <SearchPreviewField
          mobile
          value={searchValue}
          onClick={openSearch}
          active={currentTab === tabs.search.value}
        />
      ) : null}
    </>
  )
}
