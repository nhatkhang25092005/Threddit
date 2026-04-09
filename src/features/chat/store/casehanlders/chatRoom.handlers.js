import { CHAT_ROOM } from "../type";

const normalizeId = (id) => String(id);

const unique = (list = []) => {
  const rawList = Array.isArray(list) ? list : [];
  const map = new Map();

  rawList.forEach((itemId) => {
    if (itemId == null) return;
    map.set(normalizeId(itemId), itemId);
  });

  return [...map.values()];
};

export const chatRoomHandlers = (state, action) => {
  switch (action.type) {
    case CHAT_ROOM.SET_ROOM_LIST:
      return {
        ...state,
        roomList: unique(action.payload),
      };

    case CHAT_ROOM.ADD_ROOM_LIST:
      return {
        ...state,
        roomList: unique([...(state.roomList || []), ...(action.payload || [])]),
      };

    case CHAT_ROOM.PREPEND_ROOM_ID: {
      const roomId = action.payload?.roomId;
      if (roomId == null) return state;

      return {
        ...state,
        roomList: unique([roomId, ...(state.roomList || [])]),
      };
    }

    case CHAT_ROOM.REMOVE_ROOM_ID: {
      const roomId = action.payload?.roomId;
      if (roomId == null) return state;

      return {
        ...state,
        roomList: (state.roomList || []).filter(
          (itemId) => normalizeId(itemId) !== normalizeId(roomId)
        ),
      };
    }

    default:
      return state;
  }
};
