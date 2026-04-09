import {
  chatRoomHandlers,
  directChatHandlers,
  hasMoreHandlers,
  loadingHandlers,
  roomByIdHandlers,
} from "../casehanlders";
import { CLASS_TYPE } from "../type";

export const reducer = (state, action) => {
  switch (action.actionClass) {
    case CLASS_TYPE.ROOM_BY_ID:
      return roomByIdHandlers(state, action);

    case CLASS_TYPE.CHAT_ROOM:
      return chatRoomHandlers(state, action);

    case CLASS_TYPE.DIRECT_CHAT:
      return directChatHandlers(state, action);

    case CLASS_TYPE.LOADING:
      return loadingHandlers(state, action);

    case CLASS_TYPE.HAS_MORE:
      return hasMoreHandlers(state, action);

    default:
      return state;
  }
};
