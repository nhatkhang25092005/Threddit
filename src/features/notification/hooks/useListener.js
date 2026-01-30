import { useEffect, useCallback, useRef } from "react";
import { convertTime } from "../../../utils/formatDate";
import { unreadCountActions, realtimeNotificationsActions } from "../actions";

export function useListener(dispatch) {
  const reconnectAttemptRef = useRef(0);
  const maxAtt = 5;

  const eventSourceRef = useRef(null);
  const reconnTimeoutRef = useRef(null);

  // ===== Message Handler =====
  const onMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);

      const convertData = {...data, createdAt: convertTime(data.createdAt),};

      dispatch(realtimeNotificationsActions.addComeNotification(convertData));
      dispatch(unreadCountActions.incrementUnreadCount());
    } catch (err) {
      console.error(
        "Error parsing notification data:",
        err?.message || String(err)
      );
    }
  }, [dispatch]);

  // ===== Connect SSE =====
  const connect = useCallback(() => {
    // cleanup old connection if exists
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    const url = `${import.meta.env.VITE_API_NOTIFICATION_LISTENER}`;
    const es = new EventSource(url, { withCredentials: true });
    eventSourceRef.current = es;

    es.onmessage = onMessage;

    es.onerror = (err) => {
      console.error("EventSource failed:", err);
      es.close();
      eventSourceRef.current = null;

      if (reconnectAttemptRef.current < maxAtt) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptRef.current),
          30000
        );

        console.log(
          `Reconnecting in ${delay}ms... (attempt ${reconnectAttemptRef.current + 1}/${maxAtt})`
        );

        reconnTimeoutRef.current = setTimeout(() => {
          reconnectAttemptRef.current += 1;
          connect();
        }, delay);
      } else {
        console.error("Max reconnect attempts reached");
      }
    };
  }, [onMessage]);

  // ===== Lifecycle =====
  useEffect(() => {
    connect();

    return () => {
      // cleanup on unmount
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnTimeoutRef.current) {
        clearTimeout(reconnTimeoutRef.current);
        reconnTimeoutRef.current = null;
      }
    };
  }, [connect]);
}
