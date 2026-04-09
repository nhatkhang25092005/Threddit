import { createAction } from "../models/action.model";
import { CLASS_TYPE, HAS_MORE } from "../type";

export const hasMoreActions = {
  setChatRoomHasMore: (hasMore) =>
    createAction(CLASS_TYPE.HAS_MORE, HAS_MORE.SET_CHAT_ROOM_HAS_MORE, hasMore),

  initChatRoomHasMore: () =>
    createAction(CLASS_TYPE.HAS_MORE, HAS_MORE.INIT_CHAT_ROOM_HAS_MORE),
};
