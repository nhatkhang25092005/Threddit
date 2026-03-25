export const createFriend = (friendData) =>({
  createdAt : new Date().toISOString(),
  friend: friendData,
  friendshipStatus:true
})