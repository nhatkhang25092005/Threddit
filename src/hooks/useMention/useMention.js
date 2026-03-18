import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {useFriendshipContext} from '../../features/friends/hooks/useFriendshipContext'
import {
  normalizeText,
  hasOnlyMentionChars,
  clamp,
  findMentionToken,
  measureCaretAnchor,
  buildInsertedMention
} from "./utils";
import MentionOverlay from './MentionOverlay'
import { useKeyDown } from "./hooks";

export function useMention({
  minChars = 0,
  maxResults = 8,
  onInsert,
} = {}) {
  const ref = useRef(null);
  const rafIdRef = useRef(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0)
  const [mentionRange, setMentionRange] = useState(null)
  const [anchor, setAnchor] = useState({ top: 0, left: 0 });
  const {state:{myFriendList}} = useFriendshipContext()

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    const filtered = myFriendList.filter((user) => {
      if (!normalizedQuery) return true;

      return (
        normalizeText(user.username).includes(normalizedQuery) ||
        normalizeText(user.displayName).includes(normalizedQuery)
      );
    });

    return filtered.slice(0, maxResults);
  }, [myFriendList, query, maxResults]);

  useEffect(() => {
    if (!open) return;

    setActiveIndex((current) => {
      const lastIndex = Math.max(results.length - 1, 0);
      return clamp(current, 0, lastIndex);
    });
  }, [open, results.length]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setMentionRange(null);
    setActiveIndex(0);
  }, []);

  const onKeyDown = useKeyDown(
    open,
    setActiveIndex,
    results,
    close,
    () => insertMention(results[activeIndex]),
    activeIndex
  )
  const refreshMentionState = useCallback(() => {
    const textarea = ref.current;
    if (!textarea) return;

    const caretIndex = textarea.selectionStart ?? 0;
    const token = findMentionToken(textarea.value, caretIndex);

    if (!token) {
      close();
      return;
    }

    const rawQuery = textarea.value.slice(token.start + 1, token.end);

    if (rawQuery.length < minChars && minChars > 0) {
      close();
      return;
    }

    if (rawQuery && !hasOnlyMentionChars(rawQuery)) {
      close();
      return;
    }

    setMentionRange(token);
    setQuery(rawQuery);
    setOpen(true);
    setAnchor(measureCaretAnchor(textarea));
  }, [close, minChars]);

  const scheduleMentionRefresh = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      refreshMentionState();
    });
  }, [refreshMentionState]);

  useEffect(() => {
    if (!open) return;

    const handleViewportChange = () => scheduleMentionRefresh();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open, scheduleMentionRefresh]);

  const insertMention = useCallback(
    (user) => {
      const textarea = ref.current;
      if (!textarea || !mentionRange) return;

      const currentValue = textarea.value;
      const before = currentValue.slice(0, mentionRange.start);
      const after = currentValue.slice(mentionRange.end);
      const insertedMention = buildInsertedMention(user);
      const nextValue = `${before}${insertedMention}${after}`;

      setValue(nextValue);

      requestAnimationFrame(() => {
        const caretIndex = before.length + insertedMention.length;
        textarea.focus();
        textarea.setSelectionRange(caretIndex, caretIndex);
      });

      close();
      onInsert?.(user);
    },
    [mentionRange, close, onInsert]
  );

  const onChange = useCallback(
    (event) => {
      setValue(event.target.value);
      scheduleMentionRefresh();
    },
    [scheduleMentionRefresh]
  );

  const onClick = useCallback(() => {
    scheduleMentionRefresh();
  }, [scheduleMentionRefresh]);

  const onSelect = useCallback(() => {
    scheduleMentionRefresh();
  }, [scheduleMentionRefresh]);

  const onScroll = useCallback(() => {
    if (!open) return;
    scheduleMentionRefresh();
  }, [open, scheduleMentionRefresh]);

  const overlay =
    MentionOverlay({
      open:open,
      anchor:anchor,
      users:results,
      activeIndex:activeIndex,
      onPick:insertMention
    })
  

  const bind = {
    ref,
    value,
    onChange,
    onKeyDown,
    onClick,
    onSelect,
    onScroll,
  };

  return {
    bind,
    value,
    setValue,
    open,
    query,
    results,
    activeIndex,
    setActiveIndex,
    close,
    insertMention,
    overlay,
  };
}
