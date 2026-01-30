import { useCallback, useRef } from "react";

/**
 * useInfiniteScroll
 * -----------------
 * A custom React hook that implements **infinite scrolling** using the
 * `IntersectionObserver` API.
 *
 * The hook observes a target DOM element (usually a sentinel element placed
 * at the end of a list). When the element enters the viewport, the provided
 * `onLoadMore` callback is invoked to load additional data.
 *
 * This hook is designed to be safe against:
 * - stale closures
 * - duplicate fetch triggers
 * - unnecessary re-renders
 *
 * ---
 * ## Parameters
 * @param {Object} options - Configuration object.
 * @param {boolean} options.hasMore
 *   Indicates whether more data is available.
 *   If `false`, the observer will not be attached.
 *
 * @param {boolean} options.loading
 *   Indicates whether a load operation is currently in progress.
 *   Prevents the `onLoadMore` callback from being triggered multiple times.
 *
 * @param {Function} options.onLoadMore
 *   Callback invoked when the target element intersects the viewport.
 *   This function should handle fetching and appending additional data.
 *
 * @param {number} [options.threshold=0.1]
 *   A value between `0` and `1` indicating how much of the target element
 *   must be visible before triggering the callback.
 *
 * @param {string} [options.rootMargin="200px"]
 *   Margin around the viewport used to trigger loading earlier or later.
 *   Useful for preloading data before the user reaches the end.
 *
 * ---
 * ## Returns
 * @returns {(node: HTMLElement | null) => void}
 * A **callback ref** function.
 * Attach this ref to the DOM element that should be observed.
 *
 * React will automatically call this function:
 * - with a DOM node when the element is mounted
 * - with `null` when the element is unmounted
 *
 * ---
 * ## Usage Example
 * ```jsx
 * const targetRef = useInfiniteScroll({
 *   hasMore,
 *   loading,
 *   onLoadMore: loadMore,
 * });
 *
 * return (
 *   <>
 *     {items.map(item => (
 *       <Item key={item.id} data={item} />
 *     ))}
 *     <div ref={targetRef} />
 *   </>
 * );
 * ```
 */

export default function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.1,
  rootMargin = "200px",
}) {
  const observerRef = useRef(null);
  const loadingRef = useRef(loading);
  const onLoadMoreRef = useRef(onLoadMore);

  loadingRef.current = loading;
  onLoadMoreRef.current = onLoadMore

  const targetRef = useCallback(
    (node) => {
      // clean observer
      if (observerRef.current) observerRef.current.disconnect();

      // check element and hasMore data
      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (
            entry.isIntersecting &&
            !loadingRef.current &&
            typeof onLoadMoreRef.current === "function"
          ) {
            onLoadMoreRef.current();
          }
        },
        { threshold, rootMargin },
      );
      observerRef.current.observe(node)
      return () => {
        observerRef.current.disconnect();
      };
    },
    [hasMore, threshold, rootMargin],
  );

  return targetRef;
}
