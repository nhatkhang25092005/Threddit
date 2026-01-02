import postApi from "../../../../services/api/postApi";
import { extractUsernames } from "../../../../utils/extractUsernames";
import {pinActions} from './pinActions'
import { handleDeleteMyPost, handleEditMyPost } from "../../../../services/request/postRequest";
import { handleSavePost, handleUnSavePost } from "../../../../services/request/postRequest";
export const postActions = {
  /**
   * Vote on a post
   * @param {string} postId 
   * @param {boolean} isUpvote 
   * @param {Object} currentVoteState 
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  async vote(postId, isUpvote, currentVoteState){
    if(!postId){
      return{
        success:false,
        error:'Post Id is required'
      }
    }
    const snapshot = {...currentVoteState}
    try{
      if(currentVoteState.isUpvote === isUpvote){
        const newState = {
          isUpvote: null,
          up: isUpvote ? currentVoteState.up - 1 : currentVoteState.up,
          down: isUpvote ? currentVoteState.down : currentVoteState.down - 1,
        };
        const response = await postApi.cancel(postId);
        
        if (response?.data?.statusCode !== 200) {
          return { success: false, data: snapshot, error: 'Failed to cancel vote' };
        }
        return { success: true, data: newState };
      }
      const newState = {
        isUpvote,
        up: currentVoteState.up + (isUpvote ? 1 : 0) - (currentVoteState.isUpvote === true ? 1 : 0),
        down: currentVoteState.down + (!isUpvote ? 1 : 0) - (currentVoteState.isUpvote === false ? 1 : 0)
      };
      const response = await postApi.Vote(postId, isUpvote);
      
      if (response?.data?.statusCode !== 200) {
        return { success: false, data: snapshot, error: 'Failed to vote' };
      }
      return { success: true, data: newState };
    }
    catch (error) {
      console.error('Vote error:', error);
      return {
        success: false,
        data: snapshot,
        error: error.message
      };
    }
  },
  /**
   * Toggle pin status
   * @param {string} postId
   * @param {boolean} currentPinStatus
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async togglePin(postId, currentPinStatus) {
    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required'
      };
    }
    try {
      const result = currentPinStatus
        ? await pinActions.unPinPost(postId)
        : await pinActions.pinPost(postId);
      if (result.isSuccess) {
        return {
          success: true,
          message: result.message
        };
      }
      return {
        success: false,
        error: result.message || 'Failed to update pin status'
      };
    } catch (error) {
      console.error('Pin toggle error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  /**
   * Delete a post
   * @param {string} postId
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async delete(postId) {
    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required'
      };
    }

    try {
      const response = await handleDeleteMyPost(postId);

      if (response.isOk()) {
        return {
          success: true,
          message: response.message || 'Post deleted successfully' 
        };
      }
      return {
        success: false,
        error: response.message || 'Failed to delete post' 
      };
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  /**
   * Edit a post
   * @param {string} postId
   * @param {string} content
   * @returns {Promise<{success: boolean, data?: Object, message?: string, error?: string}>}
   */
  async edit(postId, content) {
    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required'
      };
    }

    if (!content.trim()) {
      return {
        success: false,
        error: 'Content cannot be empty'
      };
    }
    try {
      const mentionedUsers = extractUsernames(content);
      const response = await handleEditMyPost(postId, content, mentionedUsers);
      if (response.isOk()) {
        return {
          success: true,
          data: { content },
          message: response.message || 'Post edited successfully' 
        };
      }
      return {
        success: false,
        error: response.message || 'Failed to edit post'
      };
    } catch (error) {
      console.error('Edit error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  /**
   * Toggle save status
   * @param {string} postId
   * @param {boolean} currentSaveStatus
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
   */
  async toggleSave(postId, currentSaveStatus) {
    if (!postId) {
      return {
        success: false,
        error: 'Post ID is required'
      };
    }
    try {
      // Import save/unsave functions
      const response = currentSaveStatus
        ? await handleUnSavePost(postId)
        : await handleSavePost(postId);
      if (response.success) {
        return {
          success: true,
          data: {
            isSaved: !currentSaveStatus,
            saveNumber: response.data.saveNumber
          }
        };
      }
      return {
        success: false,
        error: response.message || 'Failed to toggle save status'
      };
    } catch (error) {
      console.error('Toggle save error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

/**
 * Validation utilities
 */
export const postValidators = {
  /**
   * Validate post content
   * @param {string} content
   * @returns {{valid: boolean, error?: string}}
   */
  validateContent(content) {
    if (!content || !content.trim()) {
      return { valid: false, error: 'Content cannot be empty' };
    }

    if (content.length > 5000) {
      return { valid: false, error: 'Content is too long (max 5000 characters)' };
    }

    return { valid: true };
  },

  /**
   * Validate post ID
   * @param {string} postId =
   * @returns {{valid: boolean, error?: string}}
   */
  validatePostId(postId) {
    if (!postId) {
      return { valid: false, error: 'Post ID is required' };
    }

    return { valid: true };
  }
};