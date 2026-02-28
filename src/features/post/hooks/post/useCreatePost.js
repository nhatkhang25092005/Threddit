import { useCallback } from "react";
import { useNotify } from "../../../../hooks/useNotify";
import { postService } from "../../services/post.service";
export function useCreatePost(dispatch){
  const notify = useNotify()
  const createPost = useCallback(async (data)=>{
    console.log(data)
    const res = await postService.createPost(data)
    console.log(res)
  },[])
  return createPost
}