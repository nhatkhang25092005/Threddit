import { useCallback, useMemo, useState } from "react";
import { normalizeFriends, toggleFriend } from "./helper";
const normalizeText = (value) => String(value ?? "").toLowerCase().trim();
export function useMentionPicker(textareaValue, myFriendList = [], defaultMentions) {
  const [query, setQuery] = useState('')
  const [friendsByUsername, setFriendsByUsername] = useState(normalizeFriends(myFriendList, defaultMentions))

  const filteredFriends = useMemo(()=>{
    const normalizedQuery = normalizeText(query || "")
    const usernames = Object.keys(friendsByUsername)
    if(!normalizedQuery) return usernames

    return usernames.filter((username) => {
      const friend = friendsByUsername[username];
      if(!friend) return null
      return (
        normalizeText(friend?.username).includes(normalizedQuery) ||
        normalizeText(friend?.displayName).includes(normalizedQuery)
      );
    });

  },[query, friendsByUsername])

  const handlePick  = useCallback((username)=>{
    setFriendsByUsername((prev) => toggleFriend(prev, username));
  },[])

  return{
    handlePick,
    friendsByUsername,
    query,
    setQuery,
    filteredFriends
  }
}