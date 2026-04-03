const resolveNotificationContentType = (contentType) => {
  const normalized = String(contentType || "").trim().toLowerCase()

  if (normalized.includes("story")) return "tin"
  if (normalized.includes("post")) return "bài viết"

  return "bài viết"
}

export const notification = {
  popover: {
    title: "Thông báo",
    read_all: {
      txt: "Đọc tất cả",
      loading: "Đang đọc...",
    },
    no_content: "Bạn chưa có thông báo nào!",
    tabs: {
      all: "Tất cả",
      unread: "Chưa đọc",
    },
    button: {
      read_all: "Đọc tất cả",
      delete_all: "Xóa tất cả",
      more: "Thêm thông báo",
      see_all: "Xem tất cả",
    },
  },
  page: {
    title: "Thông báo",
    tabs: {
      all: "Tất cả",
      unread: "Chưa đọc",
    },
  },
  notification: {
    delete: "Xóa thông báo",
    mark_as_read: "Đánh dấu là đã đọc",
  },
  popup: {
    closeButton: "Đóng",
  },
  loading: {
    title: "Vui lòng chờ",
    defaultMessage: "Đang xử lý, vui lòng chờ trong giây lát...",
  },
  defaults: {
    noContent: "Không có nội dung",
    noTitle: "Thông báo",
    noButtonLabel: "Ok",
  },

  message: {
    DEFAULT: "đã gửi một thông báo mới",
    FOLLOW: "đã bắt đầu theo dõi bạn",
    FOLLOWING_CONTENT_CREATION: ({ contentType }) =>
      `vừa mới đăng tải ${resolveNotificationContentType(contentType)} mới`,
    FRIEND_CONTENT_CREATION: ({ contentType }) =>
      `vừa mới đăng tải ${resolveNotificationContentType(contentType)} mới`,
    FRIEND_REQUEST: "đã gửi lời mời kết bạn",
    FRIEND_ACCEPTED: "từ bây giờ đã là bạn bè",
    COMMENT: "đã bình luận vào bài viết của bạn",
    REPLY_COMMENT: "đã trả lời bình luận của bạn",
    MENTION_IN_COMMENT: "đề cập bạn trong một bình luận",
    MENTION_IN_CONTENT: "đề cập bạn trong một bài viết",
    REACTION_CONTENT: "đã thả cảm xúc bài viết của bạn",
    REACTION_COMMENT: "đã thả cảm xúc bình luận của bạn",
  },
}
