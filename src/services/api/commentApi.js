import axiosClient from "../axiosClient";
const commentApi = {
  // Get comment of a post
  getComments: (postId, cursor) => {
    const url = axiosClient.get(import.meta.env.VITE_API_POST + `/${postId}` +import.meta.env.VITE_API_COMMENT)
    const finalUrl = cursor ?  `${url}?cursor=${cursor}`  : url
    return finalUrl
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