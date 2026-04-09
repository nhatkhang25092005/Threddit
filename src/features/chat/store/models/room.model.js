const pickRoomId = (room = {}) =>
  room?.id ?? room?._id ?? room?.chatRoomId ?? room?.roomId ?? null;

const pickParticipants = (room = {}) => {
  if (Array.isArray(room?.participants)) return room.participants;
  if (Array.isArray(room?.members)) return room.members;
  if (Array.isArray(room?.users)) return room.users;
  return [];
};

const pickLastMessage = (room = {}) =>
  room?.lastMessage ?? room?.latestMessage ?? room?.message ?? null;

const pickCreatedAt = (room = {}) =>
  room?.time?.createdAt ??
  room?.createdAt ??
  room?.lastMessage?.createdAt ??
  room?.latestMessage?.createdAt ??
  null;

const pickUpdatedAt = (room = {}) =>
  room?.time?.updatedAt ??
  room?.updatedAt ??
  room?.lastMessage?.createdAt ??
  room?.latestMessage?.createdAt ??
  pickCreatedAt(room);

export const roomModel = (room = {}) => {
  const id = pickRoomId(room);
  const unreadCount = Number(
    room?.unreadCount ?? room?.unreadMessageCount ?? room?.unreadMessages ?? 0
  );

  return {
    ...room,
    ...(id != null ? { id } : {}),
    participants: pickParticipants(room),
    lastMessage: pickLastMessage(room),
    unreadCount: Number.isFinite(unreadCount) ? unreadCount : 0,
    time: {
      ...(room?.time || {}),
      createdAt: pickCreatedAt(room),
      updatedAt: pickUpdatedAt(room),
    },
  };
};
