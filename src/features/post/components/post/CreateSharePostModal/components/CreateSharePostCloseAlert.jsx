import CloseAlert from "../../CreatePostModal/components/CloseAlert";
import { useShareCloseAlertData } from "../hooks";

export default function CreateSharePostCloseAlert() {
  const {
    isCloseAlertOpen,
    message,
    onCancel,
    onConfirm,
    title,
  } = useShareCloseAlertData();

  if (!isCloseAlertOpen) {
    return null;
  }

  return (
    <CloseAlert
      title={title}
      message={message}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
