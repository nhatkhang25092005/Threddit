import axios from '../../axios'
const COMMENT_BASE = import.meta.env.VITE_API_COMMENT_BASE
const CONTENT_BASE = import.meta.env.VITE_API_CONTENT_BASE
const CHILD_COMMENT = import.meta.env.VITE_API_GET_CHILD_COMMENT
export const commentApi = {
  getCommentOf(postId, cursor, signal){
    const url = `${CONTENT_BASE}/${postId}${COMMENT_BASE}`
    return axios.get(url,{params:{cursor},signal})
  },

  createComment(postId, payload){
    const url = `${CONTENT_BASE}/${postId}${COMMENT_BASE}`
    return axios.post(url, payload)
  },

  getChildComment(parentCommentId, cursor, signal){
    const url = `${CONTENT_BASE}${COMMENT_BASE}/${parentCommentId}${CHILD_COMMENT}`
    return axios.get(url,{params:{cursor},signal})
  }
}