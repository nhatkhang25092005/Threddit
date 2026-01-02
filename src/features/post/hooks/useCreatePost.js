import { useState } from "react";
import {handleCreatePost} from "../../../services/request/postRequest";
import { Result } from "../../../class";
import { DISPLAY, TITLE,TEXT } from "../../../constant";
import { useNotify } from "../../../hooks/useNotify";
export default function useCreatePost() {
  const [content, setContent] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const notify = useNotify()

  const handlePost = async (onPost) => {
    setBtnLoading(true);
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
        notify.popup(TITLE.NOTIFICATION, TEXT.CREATE_POST_SUCCESS)
      }
      else {
        notify.popup(TITLE.ERROR, res.message, null)
      }
      if (onPost) onPost(res); // callback để reload danh sách bài viết
    } catch (error) {
      notify.popup(TITLE.ERROR, error.message, null)
    } finally {
      setBtnLoading(false);
    }
  }

  return {
    content,
    setContent,
    btnLoading,
    handlePost,
  };
}
