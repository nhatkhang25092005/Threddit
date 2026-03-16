import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAuth from "../../../../../../core/auth/useAuth";
import { useMention } from "../../../../../../hooks/useMention";
import { usePostContext } from "../../../../hooks";

export function useCreateShareComposer(options = {}) {
  const { user } = useAuth();
  const {
    actions: { sharePost },
    selector: {
      post: {
        getPostById,
        getShareLoadingByPostIdOf,
      }
    }
  } = usePostContext();
  const onCloseRef = useRef(options?.onClose);
  const postIdRef = useRef(options?.postId ?? null);
  const initialMessageRef = useRef(options?.initialMessage ?? "");
  const mention = useMention({ minChars: 0 });
  const { close: closeMention, setValue: setMentionValue } = mention;
  const [isMentionListOpen, setIsMentionListOpen] = useState(false);
  const [isCloseAlertOpen, setIsCloseAlertOpen] = useState(false);
  const post = getPostById(postIdRef.current);
  const loading = getShareLoadingByPostIdOf(postIdRef.current);

  useEffect(() => {
    setMentionValue(initialMessageRef.current);
  }, [setMentionValue]);

  const displayName = useMemo(
    () => user?.displayName || user?.username || "Ban",
    [user?.displayName, user?.username]
  );

  const handleOpenMentionList = useCallback(() => {
    closeMention?.();
    setIsMentionListOpen(true);
  }, [closeMention]);

  const handleCloseMentionList = useCallback(() => {
    setIsMentionListOpen(false);
  }, []);

  const handleAttemptClose = useCallback(() => {
    closeMention?.();
    setIsCloseAlertOpen(true);
  }, [closeMention]);

  const handleCancelClose = useCallback(() => {
    setIsCloseAlertOpen(false);
  }, []);

  const handleConfirmClose = useCallback(() => {
    setIsCloseAlertOpen(false);
    setIsMentionListOpen(false);
    onCloseRef.current?.();
  }, []);

  const canSubmit = Boolean(post?.id) && !loading;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return null;

    const response = await sharePost(postIdRef.current, {
      message: mention.value || "",
    });

    if (response?.success) {
      setIsCloseAlertOpen(false);
      setIsMentionListOpen(false);
      onCloseRef.current?.();
    }

    return response;
  }, [canSubmit, mention.value, sharePost]);

  return {
    avatarUrl: user?.avatarUrl || null,
    canSubmit,
    displayName,
    handleAttemptClose,
    handleCancelClose,
    handleCloseMentionList,
    handleConfirmClose,
    handleOpenMentionList,
    handleSubmit,
    isCloseAlertOpen,
    isMentionListOpen,
    loading,
    mention,
    post,
  };
}
