export const mentionFriendModel = (item) => ({
  username: item.friend?.username ?? null,
  displayName: item.friend?.displayName ?? null,
  avatarUrl: item.friend?.avatarUrl ?? null,
})