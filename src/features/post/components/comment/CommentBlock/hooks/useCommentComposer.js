import { useCallback, useState } from "react";

export function useCommentComposer({
  comment,
  onEdit,
  onReply,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const openEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const closeEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const toggleReplying = useCallback(() => {
    setIsReplying((current) => !current);
  }, []);

  const closeReplying = useCallback(() => {
    setIsReplying(false);
  }, []);

  const submitEdit = useCallback(
    async ({ media, text }) => {
      if (typeof onEdit !== "function") {
        return { success: false };
      }

      const result = await onEdit(comment?.id, {
        media,
        text,
      });

      if (result?.success !== false) {
        setIsEditing(false);
      }

      return result;
    },
    [comment?.id, onEdit]
  );

  const submitReply = useCallback(
    async ({ media, text }) => {
      if (typeof onReply !== "function") {
        return { success: false };
      }

      const result = await onReply({
        media,
        parentComment: comment,
        text,
      });

      if (result?.success !== false) {
        setIsReplying(false);
      }

      return result;
    },
    [comment, onReply]
  );

  return {
    closeEdit,
    closeReplying,
    isEditing,
    isReplying,
    openEdit,
    submitEdit,
    submitReply,
    toggleReplying,
  };
}
