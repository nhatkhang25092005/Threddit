import { itemModel } from "../models/item.model";
import { ROOM_BY_ID } from "../type";

const normalizeId = (id) => String(id);

const mergeRoomChanges = (currentRoom, changes = {}) => ({
  ...currentRoom,
  ...changes,
  ...(changes?.time
    ? {
        time: {
          ...(currentRoom.time || {}),
          ...changes.time,
        },
      }
    : {}),
  ...(changes?.lastMessage
    ? {
        lastMessage: {
          ...(currentRoom.lastMessage || {}),
          ...changes.lastMessage,
        },
      }
    : {}),
  ...(changes?.viewer
    ? {
        viewer: {
          ...(currentRoom.viewer || {}),
          ...changes.viewer,
        },
      }
    : {}),
});

const removeDirectRoomMapping = (record = {}, roomId) =>
  Object.fromEntries(
    Object.entries(record || {}).filter(
      ([, mappedRoomId]) => normalizeId(mappedRoomId) !== normalizeId(roomId)
    )
  );

const removeRoomIdFromList = (list = [], roomId) =>
  (Array.isArray(list) ? list : []).filter(
    (itemId) => normalizeId(itemId) !== normalizeId(roomId)
  );

export const roomByIdHandlers = (state, action) => {
  switch (action.type) {
    case ROOM_BY_ID.ADD_ROOMS_BY_ID: {
      const rooms = action.payload || [];

      const byId = Object.fromEntries(
        rooms.filter((room) => room?.id != null).map((room) => [room.id, room])
      );

      const loadingItem = Object.fromEntries(
        rooms
          .filter((room) => room?.id != null)
          .map((room) => [room.id, state.loading.item?.[room.id] || itemModel()])
      );

      return {
        ...state,
        roomById: {
          ...state.roomById,
          ...byId,
        },
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            ...loadingItem,
          },
        },
      };
    }

    case ROOM_BY_ID.ADD_ROOM_BY_ID: {
      const room = action.payload || null;
      if (!room || room.id == null) return state;

      return {
        ...state,
        roomById: {
          ...state.roomById,
          [room.id]: room,
        },
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [room.id]: state.loading.item?.[room.id] || itemModel(),
          },
        },
      };
    }

    case ROOM_BY_ID.UPDATE_ROOM_BY_ID: {
      const { id, changes } = action.payload || {};
      if (id == null) return state;

      const currentRoom = state.roomById?.[id];
      if (!currentRoom) return state;

      return {
        ...state,
        roomById: {
          ...state.roomById,
          [id]: mergeRoomChanges(currentRoom, changes),
        },
      };
    }

    case ROOM_BY_ID.REMOVE_ROOM_BY_ID: {
      const { id } = action.payload || {};
      if (id == null) return state;

      const nextRoomById = { ...(state.roomById || {}) };
      const nextLoadingItem = { ...(state.loading?.item || {}) };

      delete nextRoomById[id];
      delete nextLoadingItem[id];

      return {
        ...state,
        roomById: nextRoomById,
        roomList: removeRoomIdFromList(state.roomList, id),
        directRoomByUser: removeDirectRoomMapping(state.directRoomByUser, id),
        loading: {
          ...state.loading,
          item: nextLoadingItem,
        },
      };
    }

    default:
      return state;
  }
};
