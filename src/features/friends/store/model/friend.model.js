export const createFriend = (friendData) =>({
  createdAt : new Date().toISOString(),
  friend: friendData,
  isFriend:true
})