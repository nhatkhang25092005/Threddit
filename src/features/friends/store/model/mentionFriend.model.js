export const mentionFriendModel = (item) => ({
  username: item?.username ?? null,
  displayName: item?.displayName ?? null,
  avatarUrl: item?.avatarUrl ?? null,
})
