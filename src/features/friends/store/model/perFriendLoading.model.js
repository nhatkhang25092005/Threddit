// These actions use username as API identifier → separate per-friend loading state
export const createPerFriendLoading = (isFriend) => ({
  ...( !isFriend && { request_friend: false }),
  ...(  isFriend && { delete_friend: false }),
})
