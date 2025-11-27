import { useEffect, useState, useRef } from "react";
import followApi from "../../../services/api/followApi";

export default function useMention(content) {
  const [showList, setShowList] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [list, setList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(" Content changed:", content);
    
    // Tìm tất cả @mentions chưa hoàn thành (chưa có khoảng trắng sau)
    const match = content.match(/@([a-zA-Z0-9_]*)$/);
    
    if (match) {
      const query = match[1];
      console.log("Found active mention, query:", query);
      setMentionQuery(query);
      setShowList(true);
    } else {
      console.log("No active mention");
      setShowList(false);
      setMentionQuery("");
    }
  }, [content]);

  useEffect(() => {
    if (!showList) return;

    const load = async () => {
      try {
        const res = await followApi.getFollowerList("me");
        
        const followerList = res.data?.data?.followerList || [];
        
        console.log(" Raw response:", res.data);
        console.log(" followerList:", followerList);
        

        const users = followerList.map(item => item.follower);
        
        console.log("Tất cả users:", users);
        console.log("Query:", mentionQuery);

        const filtered = mentionQuery.length > 0
          ? users.filter((u) =>
              u.username?.toLowerCase().includes(mentionQuery.toLowerCase())
            )
          : users;

        setList(filtered);
        
        console.log("Danh sách mention sau filter:", filtered);
      } catch (e) {
        console.log("Lỗi lấy danh sách following:", e);
        setList([]);
      }
    };

    const timeout = setTimeout(load, 200); 
    return () => clearTimeout(timeout);
  }, [mentionQuery, showList]);

  return {
    inputRef,
    showList,
    list,
    mentionQuery,
    setShowList,
  };
}