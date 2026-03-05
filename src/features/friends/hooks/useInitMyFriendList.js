import { useCallback, useEffect, useRef } from "react";
import { useSafeRequest } from "../../../hooks/useSafeRequest";
import { apiService } from "../services/api.service";
import { friendListActions } from "../store/actions"
import { mentionFriendModel } from "../store/model/mentionFriend.model";

export function useInitMyFriendList(dispatch) {
  const cursorRef = useRef(null);
  const runRequest = useSafeRequest();

  const getInitFriendList = useCallback(async () => {
    cursorRef.current = null; // reset khi init
    let nextCursor = cursorRef.current;

    while (true) {
      const r = await runRequest(
        (signal) => apiService.getFriendList(null, nextCursor, signal),
        10,
        "Refetch My Friend List again",
        "Get My Friend List Fail"
      );

      if (!r) return;
      if (!r.success) {
        console.error(r.message);
        return;
      }

      const list = r.data?.friendList ?? [];
      nextCursor = r.data?.cursor ?? null;
      const normalizeList = list.map(item => mentionFriendModel(item))

      if (list.length) {
        dispatch(friendListActions.addMyFriends(normalizeList));
      }

      // dừng khi không còn cursor (hoặc BE trả null/undefined)
      if (!nextCursor) break;
    }

    cursorRef.current = nextCursor;
  }, [runRequest, dispatch]);

  useEffect(() => {
    getInitFriendList();
  }, [getInitFriendList]);
}