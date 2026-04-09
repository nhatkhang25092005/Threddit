import { createAction } from "../models/action.model";
import { CLASS_TYPE, LOADING } from "../type";

export const loadingAction = {
  getChatRoomsLoading: (isLoading) =>
    createAction(CLASS_TYPE.LOADING, LOADING.GET_CHAT_ROOMS, isLoading),

  getDirectChatRoomLoading: (isLoading) =>
    createAction(CLASS_TYPE.LOADING, LOADING.GET_DIRECT_CHAT_ROOM, isLoading),

  setRoomLoading: (id, isLoading) =>
    createAction(CLASS_TYPE.LOADING, LOADING.SET_ROOM_LOADING, {
      id,
      isLoading,
    }),
};
