import LoadingScreen from "../../components/notify/LoadingScreen";
import PopupNotification from "../../components/notify/PopupNotification";
import SnakeBarNotification from "../../components/notify/SnakeBarNotification";
import CustomModal from "../../components/notify/CustomModal";
import SnackBarLoading from "../../components/notify/SnackBarLoading";
import { notification } from "../../constant/text/vi/notification.text";
export const NOTIFY_MAP = {
  snackbar: SnakeBarNotification,
  popup: PopupNotification,
  loading: LoadingScreen,
  customModal: CustomModal,
  snackbar_loading:SnackBarLoading
}

export const LABEL = {
  NO_CONTENT : notification.defaults.noContent,
  NO_TITLE: notification.defaults.noTitle,
  NO_BTN_LABEL: notification.defaults.noButtonLabel
}
