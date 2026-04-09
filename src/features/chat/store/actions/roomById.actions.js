import { createAction } from "../models/action.model";
import { CLASS_TYPE, ROOM_BY_ID } from "../type";

export const roomByIdActions = {
  addRooms: (metaData) =>
    createAction(CLASS_TYPE.ROOM_BY_ID, ROOM_BY_ID.ADD_ROOMS_BY_ID, metaData),

  addRoom: (roomData) =>
    createAction(CLASS_TYPE.ROOM_BY_ID, ROOM_BY_ID.ADD_ROOM_BY_ID, roomData),

  updateRoom: (id, changes = {}) =>
    createAction(CLASS_TYPE.ROOM_BY_ID, ROOM_BY_ID.UPDATE_ROOM_BY_ID, {
      id,
      changes,
    }),

  removeRoom: (id) =>
    createAction(CLASS_TYPE.ROOM_BY_ID, ROOM_BY_ID.REMOVE_ROOM_BY_ID, { id }),
};
