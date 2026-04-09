import { itemModel } from "../models/item.model";
import { LOADING } from "../type";

export const loadingHandlers = (state, action) => {
  switch (action.type) {
    case LOADING.GET_CHAT_ROOMS:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getChatRooms: Boolean(action.payload),
          },
        },
      };

    case LOADING.GET_DIRECT_CHAT_ROOM:
      return {
        ...state,
        loading: {
          ...state.loading,
          global: {
            ...state.loading.global,
            getDirectChatRoom: Boolean(action.payload),
          },
        },
      };

    case LOADING.SET_ROOM_LOADING: {
      const { id, isLoading } = action.payload || {};
      if (id == null) return state;

      const currentItemLoading = state.loading.item?.[id] || itemModel();
      const nextRoomLoading = Boolean(isLoading);

      if (currentItemLoading.room === nextRoomLoading) return state;

      return {
        ...state,
        loading: {
          ...state.loading,
          item: {
            ...state.loading.item,
            [id]: {
              ...currentItemLoading,
              room: nextRoomLoading,
            },
          },
        },
      };
    }

    default:
      return state;
  }
};
