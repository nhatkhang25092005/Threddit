import { createAction } from "../models/action.model";
import { CHAT_ROOM, CLASS_TYPE } from "../type";

export const chatRoomActions = {
  setRoomList: (roomIds = []) =>
    createAction(CLASS_TYPE.CHAT_ROOM, CHAT_ROOM.SET_ROOM_LIST, roomIds),

  addRoomList: (roomIds = []) =>
    createAction(CLASS_TYPE.CHAT_ROOM, CHAT_ROOM.ADD_ROOM_LIST, roomIds),

  prependRoomId: (roomId) =>
    createAction(CLASS_TYPE.CHAT_ROOM, CHAT_ROOM.PREPEND_ROOM_ID, { roomId }),

  removeRoomId: (roomId) =>
    createAction(CLASS_TYPE.CHAT_ROOM, CHAT_ROOM.REMOVE_ROOM_ID, { roomId }),
};
