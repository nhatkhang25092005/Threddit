import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PersonIcon from "@mui/icons-material/Person";
import SmartDisplayRoundedIcon from "@mui/icons-material/SmartDisplayRounded";
import HomeIcon from "../../../assets/icons/home.svg?react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import { routes } from "../../../constant";
import { sidebar } from "../../../constant/text/vi/sidebar.text";

export const SIDEBAR_WIDTH = {
  expanded: 248,
  collapsed: 96,
}

export const HOVER_EXPAND_DELAY = 300

export const LAYOUT_TABS = {
  home: {
    value: "home",
    label: sidebar.tabs.home,
    path: "/app/home",
    Icon: HomeIcon,
  },
  search: {
    value: "search",
    label: sidebar.tabs.search,
    path: "/app/search",
    Icon: SearchIcon,
  },
  stories: {
    value: "stories",
    label: sidebar.tabs.stories,
    path: "/app/reel",
    Icon: SmartDisplayRoundedIcon,
    iconProps: { fontSize: "large" },
  },
  chat: {
    value: "chat",
    label: sidebar.tabs.chat,
    path: routes.chat,
    Icon: ChatBubbleOutlineRoundedIcon,
    iconProps: { fontSize: "large" },
  },
  notification: {
    value: "notification",
    label: sidebar.tabs.notification,
    path: routes.notification,
  },
  profile: {
    value: "profile",
    label: sidebar.tabs.profile,
    path: routes.profile,
    Icon: PersonIcon,
    iconProps: { fontSize: "large" },
  },
}

export const DESKTOP_TAB_KEYS = ["home", "search", "stories", "chat", "profile"]
export const MOBILE_TAB_KEYS = ["home", "search", "chat", "notification", "profile"]
