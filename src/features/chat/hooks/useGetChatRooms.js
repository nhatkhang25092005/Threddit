import { useCallback, useEffect, useRef } from "react";
import { services } from "../services";
import {
  combineActions,
  hasMoreActions,
  loadingAction,
} from "../store/actions";

const resolveNextCursor = (data = {}) =>
  data?.cursor ?? data?.nextCursor ?? data?.pagination?.nextCursor ?? null;

const resolveChatRoomsHasMore = (data = {}, rooms = []) => {
  if (typeof data?.hasMore === "boolean") return data.hasMore;
  if (typeof data?.pagination?.hasMore === "boolean") {
    return data.pagination.hasMore;
  }

  return Array.isArray(rooms) && rooms.length > 0;
};

export function useGetChatRooms(dispatch, hasMore) {
  const cursorRef = useRef(null);
  const hasMoreRef = useRef(hasMore);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const getChatRooms = useCallback(
    async (options = {}) => {
      const {
        cursor = cursorRef.current,
        signal,
        mode = cursor == null ? "set" : "append",
      } = options;

      if (mode !== "set" && hasMoreRef.current === false) {
        return {
          success: true,
          message: "No more chat rooms",
          data: {
            rooms: [],
            hasMore: false,
            cursor: cursorRef.current,
          },
        };
      }

      dispatch(loadingAction.getChatRoomsLoading(true));

      try {
        const response = await services.getChatRooms(signal, cursor);
        console.log(response)
        if (!response?.success) return response;

        const data = response.data || {};
        const rooms = combineActions.getChatRoomsSuccess(dispatch, data, mode);
        const nextHasMore = resolveChatRoomsHasMore(data, rooms);
        const nextCursor = nextHasMore ? resolveNextCursor(data) : null;

        cursorRef.current = nextCursor;
        dispatch(hasMoreActions.setChatRoomHasMore(nextHasMore));

        return {
          ...response,
          data: {
            ...data,
            rooms,
            cursor: nextCursor,
            hasMore: nextHasMore,
          },
        };
      } finally {
        dispatch(loadingAction.getChatRoomsLoading(false));
      }
    },
    [dispatch]
  );

  const refreshChatRooms = useCallback(
    async (options = {}) => {
      cursorRef.current = null;
      dispatch(hasMoreActions.initChatRoomHasMore());

      return getChatRooms({
        ...options,
        cursor: null,
        mode: "set",
      });
    },
    [dispatch, getChatRooms]
  );

  return {
    getChatRooms,
    refreshChatRooms,
  };
}
