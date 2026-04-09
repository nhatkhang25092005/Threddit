export const initState = {
  roomById: {},
  roomList: [],
  directRoomByUser: {},
  chatRoomHasMore: undefined,
  loading: {
    global: {
      getChatRooms: false,
      getDirectChatRoom: false,
    },
    item: {
      // [roomId]: itemModel()
    },
  },
};
