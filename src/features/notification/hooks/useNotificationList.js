import { useEffect, useState, useRef } from "react";
import { handleGetNotificationsRequest, handleMarkReadNotificationRequest } from "../../../services/request/notificationRequest";
import convertTime from "../../../utils/convertTime";
import { Result } from "../../../class";
import { TITLE, DISPLAY } from "../../../constant";
import { useNotificationContext } from "../../../hooks/useNotificationContext";

export default function useNotificationList() {
  const [list, setList] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const firstLoad = useRef(false);
  const {setCount} = useNotificationContext()

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const response = await handleGetNotificationsRequest(cursor);

    if (response.data.statusCode === 204) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    if (response.isOk()) {

      // mark read all new notification
      response.data.notifications.map(async (item) => {
        if (!item.isRead) { await handleMarkReadNotificationRequest(item.id) }
      });

      // set the number of unread notification to 0
      setCount(0)

      // convert time to relative time
      const newList = response.data.notifications.map(item => ({
        ...item,
        createdAt : convertTime(item.createdAt)
      }))

      // append new notification to list
      setList((prev) => [...prev, ...newList]);

      // update cursor
      setCursor(response.data.cursor);
    } else {
      setError(new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null));
      return;
    }
    setLoading(false);
  };

  //ensure load once
  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
      loadMore();
    }
  }, []);

  return { list, error, loadMore, hasMore, loading };
}
