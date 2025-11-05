import { useEffect, useRef } from "react";

/**
 * A custom React hook for implementing **infinite scroll** behavior.
 *
 * ---
 * ## 📘 Description
 * This hook uses the `IntersectionObserver` API to detect when a target element
 * (usually the last item or a sentinel div at the bottom of a list)
 * becomes visible within the viewport.  
 * When that happens, it automatically calls the provided `onLoadMore` callback
 * to load additional content (e.g., fetch the next batch of data).
 *
 * ---
 * ## ⚠️ Important
 * - The hook **must** receive a **single object** as an argument.
 * - All property names are **case-sensitive** and must match exactly:
 *   `{ hasMore, loading, onLoadMore, threshold, rootMargin }`.
 * - If you misspell a key (e.g. `loadmore` instead of `onLoadMore`),
 *   the hook will silently fail and not trigger the observer.
 *
 * ---
 * ## 🧩 Parameters
 * @param {Object} options - Configuration object. **Required.**
 * @param {boolean} options.hasMore - Whether there’s more data to load.
 *   - If `false`, the observer will not activate.
 * @param {boolean} options.loading - Indicates whether data is currently being fetched.
 *   - Prevents multiple triggers while loading.
 * @param {Function} options.onLoadMore - Callback fired when the target enters the viewport.
 *   - Should handle loading and appending new data.
 * @param {number} [options.threshold=0.1] - How much of the target should be visible
 *   before triggering the callback (value between `0` and `1`).
 * @param {string} [options.rootMargin="200px"] - Margin around the viewport for early trigger.
 *   - Useful for preloading before the user reaches the end.
 *
 * ---
 * ##  Returns
 * @returns {React.RefObject<HTMLElement>} A React ref.
 * Attach this ref to the DOM element you want the observer to track.
 *
 * ---
 * ## 💡 Example
 * ```jsx
 * import useInfiniteScroll from "./useInfiniteScroll";
 *
 * function PostList() {
 *   const [posts, setPosts] = useState([]);
 *   const [loading, setLoading] = useState(false);
 *   const [hasMore, setHasMore] = useState(true);
 *
 *   const loadMore = async () => {
 *     setLoading(true);
 *     const newPosts = await fetchNextPosts(); // Your fetch logic
 *     setPosts((prev) => [...prev, ...newPosts]);
 *     setHasMore(newPosts.length > 0);
 *     setLoading(false);
 *   };
 *
 *   // ✅ Always pass an object with correct key names
 *   const targetRef = useInfiniteScroll({
 *     hasMore,
 *     loading,
 *     onLoadMore: loadMore,
 *     threshold: 0.2,
 *     rootMargin: "150px"
 *   });
 *
 *   return (
 *     <div>
 *       {posts.map((post) => (
 *         <Post key={post.id} data={post} />
 *       ))}
 *       <div ref={targetRef} />
 *       {loading && <p>Loading...</p>}
 *     </div>
 *   );
 * }
 * ```
 */


export default function useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore,
    threshold = 0.1,
    rootMargin = "200px"
}){
    const targetRef = useRef(null)
    const loadingRef = useRef(loading)
    const onLoadMoreRef = useRef(onLoadMore)
    useEffect(()=>{
        loadingRef.current = loading
    },[loading])
    useEffect(()=>{
        onLoadMoreRef.current = onLoadMore
    },[onLoadMore])
    useEffect(()=>{
        if(!hasMore) return
        const observer = new IntersectionObserver(
            (entries)=>{
                const target = entries[0]
                if(target.isIntersecting && !loadingRef.current && typeof onLoadMoreRef.current === "function") {
                    onLoadMoreRef.current()}
            },
            {threshold,rootMargin})
        if(targetRef.current) observer.observe(targetRef.current)
        return ()=>{
            observer.disconnect()}
    },[hasMore, threshold, rootMargin])

    return targetRef
}