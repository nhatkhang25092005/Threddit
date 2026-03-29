import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProfileModal } from "../provider/useProfileModal";

export function useOpenDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openModal } = useProfileModal();
  const contentId = searchParams.get("contentId") || null;

  useEffect(() => {
    if (contentId == null) return;

    openModal("detail_post", { postId: contentId });

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("contentId");
    setSearchParams(nextParams, { replace: true });
  }, [contentId, openModal, searchParams, setSearchParams]);
}
