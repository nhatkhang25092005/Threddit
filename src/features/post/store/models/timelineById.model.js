export const timelineByIdModel = (data) => ({
  timelineItemId: data.timelineItemId,
  contentId: data.contentId,

  type: data.timelineItemType,     // create | share
  isShared: data.isShared || false,
  sharedAt: data.sharedAt || null,
  sharedMessage: data.sharedMessage || null,

  timelineOwner: {
    username: data.timelineOwner?.username || null,
    displayName: data.timelineOwner?.displayName || null,
    avatarUrl: data.timelineOwner?.avatarUrl || null,
  },

  isTimelineItemOwner: data.isTimelineItemOwner || false,

  timelineCreatedAt: data.timelineCreatedAt || null,
})