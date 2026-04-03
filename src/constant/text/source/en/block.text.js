export const block = {
  confirmModal: {
    title: "Block {displayName}?",
    description:
      "They will no longer be able to view your profile, message you, or interact with you. You can unblock them at any time.",
    cancelButton: "Cancel",
    confirmButton: "Block now",
    consequences: [
      "They can no longer view your posts",
      "You will immediately unfriend each other",
      "They can no longer follow or tag you",
    ],
  },
  blockList: {
    loadingMessage: "Loading block list...",
    emptyMessage: "No one is in the block list yet",
  },
  unblock_button: {
    label: "Unblock",
    loadingLabel: "Unblocking...",
    tooltip: "Remove from block list",
  },
  blockButton: {
    loadingLabel: "Blocking...",
    tooltip: "Add to block list",
  },
  navigatePopup: "You have blocked this user. Please unblock to continue",
}
