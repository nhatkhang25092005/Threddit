import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DesktopSidebar from "./components/DesktopSidebar";
import MobileNavigation from "./components/MobileNavigation";
import { useAppLayoutState } from "./hooks/useAppLayoutState";
import { style } from "./style";

export default function AppLayout({ customStyle }) {
  const controller = useAppLayoutState()

  return (
    <Box sx={(currentTheme) => style.shell(currentTheme)}>
      {controller.isMobile ? (
        <MobileNavigation controller={controller} />
      ) : (
        <DesktopSidebar controller={controller} customStyle={customStyle} />
      )}

      <Box
        component="main"
        sx={(currentTheme) => style.main(currentTheme)}
      >
        <Box sx={style.contentWrap(controller.isMobile)}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
