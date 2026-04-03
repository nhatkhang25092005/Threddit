export const reelText = {
  navigation: {
    previousAriaLabel: "Previous reel",
    nextAriaLabel: "Next reel",
  },
  media: {
    placeholderTitle: "Reel preview",
    placeholderDescription: "No video available to display",
    countLabel: (count) => `+${count} media`,
    playAriaLabel: "Play video",
    pauseAriaLabel: "Pause video",
    unmuteAriaLabel: "Unmute video",
    muteAriaLabel: "Mute video",
    imageAlt: "Reel media",
  },
  commentSidebar: {
    title: "Comments",
    fallbackAuthorLabel: "Current reel",
    closeAriaLabel: "Hide comments",
  },
  profileAvatar: {
    openProfileAriaLabel: (profileHandle) => `Open profile ${profileHandle}`,
    avatarAriaLabel: "Avatar",
  },
}
