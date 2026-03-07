export const resolvePinOption = (isOwner, contextPost) =>
  !!(isOwner && contextPost !== 'savedPost')