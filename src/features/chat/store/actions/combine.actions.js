import { roomModel } from "../models/room.model";
import { chatRoomActions } from "./chatRoom.actions";
import { directChatActions } from "./directChat.actions";
import { roomByIdActions } from "./roomById.actions";

const extractRoomList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.rooms)) return data.rooms;
  if (Array.isArray(data?.chatRooms)) return data.chatRooms;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const getRoomIds = (rooms = []) =>
  rooms.map((room) => room?.id).filter((id) => id != null);

export const combineActions = {
  getChatRoomsSuccess: (dispatch, data, mode = "append") => {
    const rooms = extractRoomList(data)
      .map((item) => roomModel(item))
      .filter((room) => room?.id != null);

    const roomIds = getRoomIds(rooms);

    if (rooms.length > 0) {
      dispatch(roomByIdActions.addRooms(rooms));
    }

    if (mode === "set") {
      dispatch(chatRoomActions.setRoomList(roomIds));
      return rooms;
    }

    if (roomIds.length > 0) {
      dispatch(chatRoomActions.addRoomList(roomIds));
    }

    return rooms;
  },

  getDirectChatRoomSuccess: (dispatch, username, data) => {
    const rawRoom = data?.room ?? data?.chatRoom ?? (Array.isArray(data) ? data[0] : data);
    const room = roomModel(rawRoom || {});

    if (room?.id == null) return null;

    dispatch(roomByIdActions.addRoom(room));
    dispatch(directChatActions.setDirectRoom(username, room.id));
    dispatch(chatRoomActions.prependRoomId(room.id));

    return room;
  },
};
