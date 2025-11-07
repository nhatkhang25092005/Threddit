import { useState } from "react";
import {handleCreatePost} from "../../../services/request/postRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE,TEXT } from "../../../constant";
export default function useCreatePost() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const handlePost = async (onPost) => {
    
    setLoading(true);
    const mentionMatches = content.match(/@(\w+)/g);

    //  Lọc bỏ ký tự @
    const mentionedUser = mentionMatches
      ? mentionMatches.map((m) => m.substring(1))
      : [];

    try {
      const res = await handleCreatePost(content, mentionedUser);
      console.log(res)
      if(res.isOk()){
        setContent("");
        setResult(new Result(DISPLAY.POPUP,TITLE.NOTIFICATION, TEXT.CREATE_POST_SUCCESS, null))
      }
      else {
        setResult(new Result(DISPLAY.POPUP,TITLE.ERROR, res.message, null))
      }
      if (onPost) onPost(res); // callback để reload danh sách bài viết
    } catch (error) {
        setResult(new Result(DISPLAY.POPUP,TITLE.ERROR, error.message, null))
    } finally {
      setLoading(false);
    }
  }

  return {
    content,
    result,
    setContent,
    loading,
    handlePost,
  };
}
