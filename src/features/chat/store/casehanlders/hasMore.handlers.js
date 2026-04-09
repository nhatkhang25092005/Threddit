import { HAS_MORE } from "../type";

export const hasMoreHandlers = (state, action) => {
  switch (action.type) {
    case HAS_MORE.SET_CHAT_ROOM_HAS_MORE:
      return {
        ...state,
        chatRoomHasMore: action.payload,
      };

    case HAS_MORE.INIT_CHAT_ROOM_HAS_MORE:
      return {
        ...state,
        chatRoomHasMore: undefined,
      };

    default:
      return state;
  }
};
