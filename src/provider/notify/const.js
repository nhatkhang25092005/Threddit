import LoadingScreen from "../../components/notify/LoadingScreen";
import PopupNotification from "../../components/notify/PopupNotification";
import SnakeBarNotification from "../../components/notify/SnakeBarNotification";
import CustomModal from "../../components/notify/CustomModal";
export const NOTIFY_MAP = {
  snackbar: SnakeBarNotification,
  popup: PopupNotification,
  loading: LoadingScreen,
  customModal: CustomModal
}

export const LABEL = {
  NO_CONTENT : 'Không có nội dung',
  NO_TITLE: 'Thông báo',
  NO_BTN_LABEL: 'Ok'
}