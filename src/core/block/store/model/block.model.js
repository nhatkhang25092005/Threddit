export const createBlockedUser = (data) => {
  return {
    blockedUser:{
      username: data.username,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl
    },
    createdAt: Date.now().toString(),
  }
}

export const createBlockStatus = (data) => {

  return {
    username: data.username,
    isBlocked: data.isBlocked,
  }
}
