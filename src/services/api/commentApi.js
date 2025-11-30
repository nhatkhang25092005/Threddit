import axiosClient from "../axiosClient";
const commentApi = {
  // Get comment of a post
  getComments: (postId, cursor, signal) => {
    const url = import.meta.env.VITE_API_POST + `/${postId}` +import.meta.env.VITE_API_COMMENT
    const finalUrl = cursor ?  `${url}?cursor=${cursor}`  : url
    return axiosClient.get(finalUrl,{signal})
  },
  
  // Write a comment to a post
  postComment:(postId, content, mentionedUser) => 
    axiosClient.post(
    import.meta.env.VITE_API_POST + `/${postId}` +import.meta.env.VITE_API_COMMENT,
    {content, mentionedUser}
  ),
  
  // Delete a comment
  deleteComment : (postId,commentId) => axiosClient.delete(import.meta.env.VITE_API_POST + `/${postId}` +import.meta.env.VITE_API_COMMENT + `/${commentId}`),

  // Edit a comment
  editComment : (postId,commentId, content, mentionedUser) => 
    axiosClient.patch(
    import.meta.env.VITE_API_POST + `/${postId}` +import.meta.env.VITE_API_COMMENT + `/${commentId}`,
    {content, mentionedUser}
  ),
}
export default commentApi