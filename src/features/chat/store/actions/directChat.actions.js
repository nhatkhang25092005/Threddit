import { createAction } from "../models/action.model";
import { CLASS_TYPE, DIRECT_CHAT } from "../type";

export const directChatActions = {
  setDirectRoom: (username, roomId) =>
    createAction(CLASS_TYPE.DIRECT_CHAT, DIRECT_CHAT.SET_DIRECT_ROOM, {
      username,
      roomId,
    }),

  removeDirectRoom: (username) =>
    createAction(CLASS_TYPE.DIRECT_CHAT, DIRECT_CHAT.REMOVE_DIRECT_ROOM, {
      username,
    }),
};
