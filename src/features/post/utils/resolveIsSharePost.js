export const resolveIsSharePost = (post) =>
  !!(post?.sharer && post?.shareId && post?.time?.sharedAt && post?.viewer?.isShared)
