import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { detailPostPage } from "../../../../../../constant/text/vi/post/detailpostpage.text";
import { routes } from "../../../../../../constant/routes";
import { useSafeRequest } from "../../../../../../hooks/useSafeRequest";
import { usePostContext } from "../../../../hooks";
import { postService } from "../../../../services/post.service";
import { postByIdModel } from "../../../../store/models/postById.model";
import { buildProfileRoute } from "../../../story/storyRoute";
import { buildDetailPostPageRoute } from "../utils/detailPostPageRoute";
import {
  buildDetailPostPageData,
  clampMediaIndex,
} from "../utils/detailPostPage.utils";

const resolveDetailContent = (data) => {
  if (data?.content && typeof data.content === "object") {
    return data.content;
  }

  return data ?? null;
};

export function useDetailPostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mediaIndex, postId } = useParams();
  const {
    selector: {
      post: { getPostById },
    },
  } = usePostContext();
  const runRequest = useSafeRequest();
  const storePost = getPostById(postId);
  const [fetchedPost, setFetchedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(() => postId != null && !storePost);
  const [errorMessage, setErrorMessage] = useState("");
  const commentSectionRef = useRef(null);

  useEffect(() => {
    if (storePost || postId == null) {
      return;
    }

    let mounted = true;

    async function fetchPost() {
      setIsLoading(true);
      setErrorMessage("");

      const response = await runRequest((signal) => postService.getPostDetail(postId, signal));

      if (!mounted || !response) {
        return;
      }

      const content = resolveDetailContent(response.data);

      if (response.success && content) {
        setFetchedPost(postByIdModel(content));
        setIsLoading(false);
        return;
      }

      setFetchedPost(null);
      setErrorMessage(response.message || detailPostPage.notFoundDescription);
      setIsLoading(false);
    }

    fetchPost();

    return () => {
      mounted = false;
    };
  }, [postId, runRequest, storePost]);

  const post = storePost ?? fetchedPost;
  const detail = useMemo(() => buildDetailPostPageData(post), [post]);
  const mediaCount = detail?.visualMedia?.length ?? 0;
  const requestedIndex = Number.parseInt(mediaIndex ?? "0", 10);
  const normalizedIndex = Number.isFinite(requestedIndex) ? requestedIndex : 0;
  const activeIndex = clampMediaIndex(normalizedIndex, mediaCount);
  const activeMedia = detail?.visualMedia?.[activeIndex] ?? null;
  const backgroundLocation = location.state?.backgroundLocation?.pathname
    ? location.state.backgroundLocation
    : null;
  const returnTo = location.state?.returnTo ?? null;
  const canInteract = Boolean(storePost);

  useEffect(() => {
    if (!detail?.post?.id || mediaCount === 0) {
      return;
    }

    if (normalizedIndex === activeIndex) {
      return;
    }

    navigate(buildDetailPostPageRoute(detail.post.id, activeIndex), {
      replace: true,
      state: location.state,
    });
  }, [activeIndex, detail?.post?.id, location.state, mediaCount, navigate, normalizedIndex]);

  const goToIndex = useCallback(
    (nextIndex) => {
      if (!detail?.post?.id) {
        return;
      }

      const safeIndex = clampMediaIndex(nextIndex, mediaCount);

      navigate(buildDetailPostPageRoute(detail.post.id, safeIndex), {
        replace: true,
        state: location.state,
      });
    },
    [detail?.post?.id, location.state, mediaCount, navigate]
  );

  const handleClose = useCallback(() => {
    if (backgroundLocation) {
      navigate(-1);
      return;
    }

    if (returnTo) {
      navigate(returnTo, { replace: true });
      return;
    }

    if (detail?.author?.username) {
      navigate(buildProfileRoute(detail.author.username), { replace: true });
      return;
    }

    navigate(routes.home, { replace: true });
  }, [backgroundLocation, detail?.author?.username, navigate, returnTo]);

  const handlePrev = useCallback(() => {
    if (activeIndex <= 0) {
      return;
    }

    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex >= mediaCount - 1) {
      return;
    }

    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex, mediaCount]);

  const handleCommentClick = useCallback(() => {
    commentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (!activeMedia) {
        return;
      }

      if (event.key === "Escape") {
        handleClose();
      }

      if (event.key === "ArrowLeft") {
        handlePrev();
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMedia, handleClose, handleNext, handlePrev]);

  useEffect(() => {
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const statusTitle = isLoading
    ? detailPostPage.loadingTitle
    : detailPostPage.notFoundTitle;
  const statusDescription = isLoading
    ? detailPostPage.loadingDescription
    : errorMessage || detailPostPage.notFoundDescription;

  return {
    activeIndex,
    activeMedia,
    canGoNext: activeIndex < mediaCount - 1,
    canGoPrev: activeIndex > 0,
    canInteract,
    commentSectionRef,
    detail,
    handleClose,
    handleCommentClick,
    handleNext,
    handlePrev,
    isLoading,
    mediaCount,
    post,
    statusDescription,
    statusTitle,
    ...(detail || {}),
  };
}
