export const reelText = {
  navigation: {
    previousAriaLabel: "Reel trước",
    nextAriaLabel: "Reel tiếp theo",
  },
  media: {
    placeholderTitle: "Xem trước reel",
    placeholderDescription: "Chưa có video để hiển thị",
    countLabel: (count) => `+${count} media`,
    playAriaLabel: "Phát video",
    pauseAriaLabel: "Tạm dừng video",
    unmuteAriaLabel: "Bật tiếng video",
    muteAriaLabel: "Tắt tiếng video",
    imageAlt: "Media reel",
  },
  commentSidebar: {
    title: "Bình luận",
    fallbackAuthorLabel: "Reel hiện tại",
    closeAriaLabel: "Ẩn bình luận",
  },
  profileAvatar: {
    openProfileAriaLabel: (profileHandle) => `Mở trang cá nhân ${profileHandle}`,
    avatarAriaLabel: "Ảnh đại diện",
  },
}
