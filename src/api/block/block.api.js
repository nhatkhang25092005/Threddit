// src/api/block/block.api.js
import axios from '../axios'

const API = {
  BLOCK_BASE: import.meta.env.VITE_API_BLOCK_BASE,           // PREFIX /block
  BLOCK_STATUS: import.meta.env.VITE_API_BLOCK_STATUS,       // /status
}

export const blockApi = {
  /* ================= GET BLOCK STATUS ================= */

  /**
   * Get block status of a specific user
   * @param {string} username - Username to check block status
   * @returns {Promise}
   */
  getBlockStatus(username, signal) {
    return axios.get(`${API.BLOCK_BASE}/${username}${API.BLOCK_STATUS}`,{signal})
  },

  /* ================= GET BLOCK LIST ================= */

  /**
   * Get list of blocked users
   * @returns {Promise}
   */
  getBlockList(cursor, signal) {
    return axios.get(API.BLOCK_BASE,{params:{cursor}, signal})
  },

  /* ================= BLOCK USER ================= */

  /**
   * Block a user
   * @param {string} username - Username to block
   * @returns {Promise}
   */
  blockUser(username) {
    return axios.post(`${API.BLOCK_BASE}/${username}`)
  },

  /* ================= UNBLOCK USER ================= */

  /**
   * Unblock a user
   * @param {string} username - Username to unblock
   * @returns {Promise}
   */
  unblockUser(username) {
    return axios.delete(`${API.BLOCK_BASE}/${username}`)
  },
}
