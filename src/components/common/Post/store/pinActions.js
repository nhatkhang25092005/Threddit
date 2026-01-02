import { Result } from "../../../../class";
import { DISPLAY, TITLE } from "../../../../constant";
import {
  handlePinMyPost,
  handleUnPinMyPost,
} from "../../../../services/request/postRequest";
export const pinActions =  {
  async pinPost(postId) {
    if (!postId) {
      console.error("postId is required to pin post");
      return {
        isSuccess: false,
        say: new Result(
          DISPLAY.POPUP,
          TITLE.ERROR,
          "postId is required to pin post",
          null
        ),
      };
    }
    try {
      const response = await handlePinMyPost(postId);
      if (response.isOk())
        return {
          isSuccess: true,
          message: response.message,
        };
      else
        return {
          isSuccess: false,
          message: new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null),
        };
    } catch (err) {
      console.error("Error in pinPost:", err);
      return {
        isSuccess: false,
        message: new Result(DISPLAY.POPUP, TITLE.ERROR, err, null),
      };
    }
  },

  async unPinPost(postId) {
    if (!postId) {
      console.error("postId is required to unpin post");
      return {
        isSuccess: false,
        say: new Result(
        DISPLAY.POPUP,
          TITLE.ERROR,
          "postId is required to unpin post",
          null
        ),
      };
    }
    try {
      const response = await handleUnPinMyPost(postId);
      if (response.isOk())
        return {
          isSuccess: true,
          message: response.message,
        };
      else
        return {
          isSuccess: false,
          say: new Result(DISPLAY.POPUP, TITLE.ERROR, response.message, null),
        };
    } catch (err) {
      console.error("Error in unpinPost:", err);
      return {
        isSuccess: false,
        say: new Result(DISPLAY.POPUP, TITLE.ERROR, err, null),
      };
    }
  }
}
