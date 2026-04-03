export const composerText = {
  post: {
    createTitle: "Create post",
    editTitle: "Edit post",
    submitLabel: "Post",
    editSubmitLabel: "Confirm edit",
    fallbackDisplayName: "You",
    closeAriaLabel: "Close",
    actionBarLabel: "Add to your post",
    actionAria: {
      addImage: "Add image",
      addVideo: "Add video",
      addSound: "Add audio",
      tagFriends: "Tag friends",
    },
    editor: {
      placeholder: (displayName) => `${displayName}, what's on your mind today`,
      removeImage: "Remove image",
      removeVideo: "Remove video",
      removeSound: "Remove audio",
      previewAlt: "Post preview",
    },
    closeAlert: {
      create: {
        title: "Close post?",
        message: "If you close now, all current post draft state will be discarded",
      },
      edit: {
        title: "Close editing?",
        message: "If you close now, your post changes will not be saved.",
      },
      cancelLabel: "Go back",
      confirmLabel: "Close",
    },
    quickComposer: {
      placeholder: "What are you thinking about?",
      updatedMessage: "Post updated",
      actionAria: {
        addImage: "Add image",
        addVideo: "Add video",
        addSound: "Add audio",
      },
    },
    errors: {
      uploadMedia: "Could not upload media",
      resolveUpdatedMediaKey: "Could not resolve mediaKey for updated media",
    },
  },
  share: {
    title: "Share post",
    submitLabel: "Share",
    actionBarLabel: "Add to your share",
    placeholder: "Say something about this post",
    closeAlert: {
      title: "Lose edited data",
      message: "If you close now, the share content you are drafting will be discarded.",
    },
  },
  mention: {
    title: "Tag friends",
    closeAriaLabel: "Close tag list",
    placeholder: "Find friends...",
    taggedLabel: "Tagged:",
    empty: "No matching friends found.",
    done: "Done",
  },
  emoji: {
    title: "Choose emoji",
  },
  tabs: {
    userPosts: "Posts",
    savedPosts: "Saved posts",
  },
}
