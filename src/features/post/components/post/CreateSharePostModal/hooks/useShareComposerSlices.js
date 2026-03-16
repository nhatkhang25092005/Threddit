import { SHARE_CLOSE_ALERT } from "../utils";
import { useShareComposerContext } from "./shareComposerContext";

export function useShareHeaderData() {
  const { handleAttemptClose } = useShareComposerContext();

  return {
    handleAttemptClose,
  };
}

export function useShareFormPanelData() {
  const {
    avatarUrl,
    canSubmit,
    displayName,
    handleOpenMentionList,
    handleSubmit,
    loading,
    mention,
  } = useShareComposerContext();

  return {
    avatarUrl,
    canSubmit,
    displayName,
    handleOpenMentionList,
    handleSubmit,
    loading,
    mention,
  };
}

export function useSharePreviewData() {
  const { post } = useShareComposerContext();

  return {
    post,
  };
}

export function useShareMentionDialogData() {
  const {
    handleCloseMentionList,
    isMentionListOpen,
    mention,
  } = useShareComposerContext();

  return {
    handleCloseMentionList,
    isMentionListOpen,
    mention,
  };
}

export function useShareCloseAlertData() {
  const {
    handleCancelClose,
    handleConfirmClose,
    isCloseAlertOpen,
  } = useShareComposerContext();

  return {
    isCloseAlertOpen,
    message: SHARE_CLOSE_ALERT.message,
    onCancel: handleCancelClose,
    onConfirm: handleConfirmClose,
    title: SHARE_CLOSE_ALERT.title,
  };
}
