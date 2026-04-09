export const createChatSelector = (state) => {
  const getRoomById = (roomId) => {
    if (roomId == null) return null;
    return state.roomById?.[roomId] || null;
  };

  const getRoomIds = () => state.roomList ?? [];

  const getRoomList = () => getRoomIds().map((roomId) => getRoomById(roomId)).filter(Boolean);

  const getDirectRoomId = (username) => {
    if (!username) return null;
    return state.directRoomByUser?.[username] ?? null;
  };

  const getDirectRoom = (username) => {
    const roomId = getDirectRoomId(username);
    if (roomId == null) return null;
    return getRoomById(roomId);
  };

  const getChatRoomHasMore = () => state.chatRoomHasMore;

  const getRoomLoadingById = (roomId) => {
    if (roomId == null) return null;
    return state.loading?.item?.[roomId] || null;
  };

  return {
    getRoomById,
    getRoomIds,
    getRoomList,
    getDirectRoomId,
    getDirectRoom,
    getChatRoomHasMore,
    getRoomLoadingById,
  };
};
