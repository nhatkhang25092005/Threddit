import { useEffect, useState } from "react";

export default function useFetchData({
  getFeed,
  hasMore,
  loading = false,
  postCount = 0,
}) {
  const [retryKey, setRetryKey] = useState(0);
  const [isInitializing, setIsInitializing] = useState(
    hasMore === undefined && postCount === 0
  );
  const hasRequested = hasMore !== undefined || postCount > 0;
  const shouldInitFetch = hasMore === undefined;

  useEffect(() => {
    if (loading || !shouldInitFetch) return;

    let isMounted = true;
    let retryTimer = null;
    let frameId = null;

    setIsInitializing(true);

    const fetchFeed = async () => {
      const response = await getFeed();

      if (!isMounted) return;
      if (response === null) {
        retryTimer = window.setTimeout(() => {
          setRetryKey((prev) => prev + 1);
        }, 0);
        return;
      }

      setIsInitializing(false);
    };

    frameId = window.requestAnimationFrame(() => {
      fetchFeed();
    });

    return () => {
      isMounted = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [getFeed, loading, shouldInitFetch, retryKey]);

  useEffect(() => {
    if (hasRequested) {
      setIsInitializing(false);
    }
  }, [hasRequested]);

  return {
    hasRequested,
    isInitializing,
  };
}
