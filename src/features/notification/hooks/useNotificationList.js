import { useEffect, useState, useRef } from "react";
import { handleGetNotificationsRequest } from "../../../services/request/notificationRequest";
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
  const {realTimeList} = useNotificationContext()

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

  // update new list when new notification comes
  useEffect(()=>{
    if(realTimeList?.length > 0 ){
      const convertTimeList = realTimeList.map(item=>({
        ...item,
        createdAt : convertTime(item.createdAt)
      }))
      setList((prev)=>[...convertTimeList, ...prev])
    }
  },[realTimeList])



  return { list, error, loadMore, hasMore, loading };
}
