import { DIRECT_CHAT } from "../type";

export const directChatHandlers = (state, action) => {
  switch (action.type) {
    case DIRECT_CHAT.SET_DIRECT_ROOM: {
      const { username, roomId } = action.payload || {};
      if (!username || roomId == null) return state;

      return {
        ...state,
        directRoomByUser: {
          ...state.directRoomByUser,
          [username]: roomId,
        },
      };
    }

    case DIRECT_CHAT.REMOVE_DIRECT_ROOM: {
      const { username } = action.payload || {};
      if (!username) return state;

      const nextDirectRoomByUser = { ...(state.directRoomByUser || {}) };
      delete nextDirectRoomByUser[username];

      return {
        ...state,
        directRoomByUser: nextDirectRoomByUser,
      };
    }

    default:
      return state;
  }
};
