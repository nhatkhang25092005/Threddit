import { mapResponse, mapErrResponse } from '../../../api/helper'
import { blockApi } from '../../../api/block/block.api'
import { delay } from "../../../utils/delaySimulator"

/**
 * Block API Service
 * Xử lý tất cả các API calls liên quan đến block feature
 * 
 * TODO: Xác định:
 * - Delay simulation có cần không? (hiện tại copy từ friend feature)
 * - Response structure từ backend?
 * - Error handling strategy?
 */

export const apiService = {
  /**
   * Lấy danh sách người bị block
   * @param {string} cursor - Pagination cursor
   * @param {AbortSignal} signal - Abort signal để cancel request
   */
  getBlockList: async (cursor, signal) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await blockApi.getBlockList(cursor, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },
/**
 * Check if the user is blocked
 * @param {string} username - The username to check
 */
  getBlockStatus: async (username, signal) => {
    try {
      const res = mapResponse(
        await blockApi.getBlockStatus(username, signal)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  /**
   * Chặn user
   * @param {string} username - Username cần block
   * 
   * TODO: Response có gì? Chỉ success flag hay có thêm data?
   */
  blockUser: async (username) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await blockApi.blockUser(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },

  /**
   * Gỡ chặn user
   * @param {string} username - Username cần unblock
   * 
   * TODO: Same như blockUser - xác định response
   */
  unblockUser: async (username) => {
    try {
      await delay(3000)
      const res = mapResponse(
        await blockApi.unblockUser(username)
      )

      return {
        success: res.is_success,
        message: res.message,
        data: res.data
      }
    } catch (err) {
      return mapErrResponse(err)
    }
  },
}
