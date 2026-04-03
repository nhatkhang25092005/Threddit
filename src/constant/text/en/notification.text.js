const resolveNotificationContentType = (contentType) => {
  const normalized = String(contentType || "").trim().toLowerCase()

  if (normalized.includes("story")) return "story"
  if (normalized.includes("post")) return "post"

  return "post"
}

export const notification = {
  popover: {
    title: "Notifications",
    read_all: {
      txt: "Read all",
      loading: "Reading...",
    },
    no_content: "You have no notifications yet!",
    tabs: {
      all: "All",
      unread: "Unread",
    },
    button: {
      read_all: "Read all",
      delete_all: "Delete all",
      more: "More notifications",
      see_all: "See all",
    },
  },
  page: {
    title: "Notifications",
    tabs: {
      all: "All",
      unread: "Unread",
    },
  },
  notification: {
    delete: "Delete notification",
    mark_as_read: "Mark as read",
  },
  popup: {
    closeButton: "Close",
  },
  loading: {
    title: "Please wait",
    defaultMessage: "Processing, please wait a moment...",
  },
  defaults: {
    noContent: "No content",
    noTitle: "Notification",
    noButtonLabel: "OK",
  },

  message: {
    DEFAULT: "sent a new notification",
    FOLLOW: "started following you",
    FOLLOWING_CONTENT_CREATION: ({ contentType }) =>
      `just posted a new ${resolveNotificationContentType(contentType)}`,
    FRIEND_CONTENT_CREATION: ({ contentType }) =>
      `just posted a new ${resolveNotificationContentType(contentType)}`,
    FRIEND_REQUEST: "sent you a friend request",
    FRIEND_ACCEPTED: "is now your friend",
    COMMENT: "commented on your post",
    REPLY_COMMENT: "replied to your comment",
    MENTION_IN_COMMENT: "mentioned you in a comment",
    MENTION_IN_CONTENT: "mentioned you in a post",
    REACTION_CONTENT: "reacted to your post",
    REACTION_COMMENT: "reacted to your comment",
  },
}
