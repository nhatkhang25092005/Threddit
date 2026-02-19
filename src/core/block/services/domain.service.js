import { blockListActions } from '../store/actions'
import { createBlockedUser } from '../store/model/block.model'

/**
 * Block Domain Service
 * Xử lý business logic và state synchronization
 * 
 * TODO: Xác định:
 * - Cần những method nào khác?
 * - Có complex business logic không?
 */

export const domain = {
  /**
   * Tạo sync handler cho block list operations
   * @param {function} dispatch - Redux/Reducer dispatch function
   */
  createBlockListSync: (dispatch) => {
    return {
      /**
       * Thêm user vào block list
       */
      addBlockedUser(blockedUserData) {
        dispatch(blockListActions.addBlockedUser(createBlockedUser(blockedUserData)))
      },

      /**
       * Xóa user khỏi block list (unblock)
       */
      removeBlockedUser(username) {
        dispatch(blockListActions.removeBlockedUser(username))
      }
    }
  }
}
