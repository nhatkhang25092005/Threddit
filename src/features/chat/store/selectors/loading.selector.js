export const createLoadingSelector = (state) => {
  const getChatRoomFetchingLoading = () => state.loading.global.getChatRooms;

  const getDirectChatRoomFetchingLoading = () =>
    state.loading.global.getDirectChatRoom;

  const getRoomLoadingById = (roomId) =>
    Boolean(state.loading.item?.[roomId]?.room);

  return {
    getChatRoomFetchingLoading,
    getDirectChatRoomFetchingLoading,
    getRoomLoadingById,
  };
};
