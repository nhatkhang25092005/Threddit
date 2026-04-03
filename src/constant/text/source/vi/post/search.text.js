export const searchText = {
  field: {
    submitAriaLabel: "G\u1eedi t\u00ecm ki\u1ebfm",
    placeholder: "T\u00ecm ki\u1ebfm...",
    keywordAriaLabel: "T\u1eeb kh\u00f3a t\u00ecm ki\u1ebfm",
    closeAriaLabel: "\u0110\u00f3ng t\u00ecm ki\u1ebfm",
    previewEyebrow: "\u0110ang t\u00ecm ki\u1ebfm",
  },
  page: {
    eyebrow: "T\u00ecm ki\u1ebfm",
    titleWithQuery: (query) => `K\u1ebft qu\u1ea3 cho "${query}"`,
    emptyTitle: "B\u1eaft \u0111\u1ea7u b\u1eb1ng m\u1ed9t t\u1eeb kh\u00f3a c\u1ee5 th\u1ec3",
    promptDescription:
      "M\u1edf \u00f4 t\u00ecm ki\u1ebfm \u1edf thanh b\u00ean v\u00e0 g\u1eedi m\u1ed9t t\u1eeb kh\u00f3a \u0111\u1ec3 xem n\u1ed9i dung v\u00e0 ng\u01b0\u1eddi d\u00f9ng ph\u00f9 h\u1ee3p.",
    resultsDescription: (userCount, postCount) => (
      `${userCount} ng\u01b0\u1eddi d\u00f9ng v\u00e0 ${postCount} n\u1ed9i dung \u0111ang \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb cho t\u1eeb kh\u00f3a n\u00e0y.`
    ),
    userResultsDescription: (count) => (
      `${count} ng\u01b0\u1eddi d\u00f9ng \u0111ang \u0111\u01b0\u1ee3c hi\u1ec3n th\u1ecb cho t\u1eeb kh\u00f3a n\u00e0y.`
    ),
    pendingDescription:
      "H\u1ec7 th\u1ed1ng \u0111ang truy v\u1ea5n v\u00e0 s\u1eafp x\u1ebfp k\u1ebft qu\u1ea3 ph\u00f9 h\u1ee3p nh\u1ea5t.",
    emptyDescription:
      "Kh\u00f4ng t\u00ecm th\u1ea5y n\u1ed9i dung ho\u1eb7c ng\u01b0\u1eddi d\u00f9ng ph\u00f9 h\u1ee3p v\u1edbi t\u1eeb kh\u00f3a n\u00e0y.",
    promptMessage:
      "Nh\u1eadp t\u1eeb kh\u00f3a \u1edf khung t\u00ecm ki\u1ebfm \u0111\u1ec3 b\u1eaft \u0111\u1ea7u.",
    noResultMessage: (query) => (
      `Kh\u00f4ng t\u00ecm th\u1ea5y k\u1ebft qu\u1ea3 ph\u00f9 h\u1ee3p v\u1edbi "${query}".`
    ),
    noPostMessage: (query) => (
      `Kh\u00f4ng t\u00ecm th\u1ea5y n\u1ed9i dung ph\u00f9 h\u1ee3p v\u1edbi "${query}".`
    ),
    usersSectionTitle: (count) => `T\u00e0i kho\u1ea3n li\u00ean quan (${count})`,
    usersSectionDescription:
      "Hi\u1ec7n t\u1ed1i \u0111a 3 t\u00e0i kho\u1ea3n tr\u00ean danh s\u00e1ch xem nhanh.",
    usersExpandedDescription:
      "Danh s\u00e1ch ng\u01b0\u1eddi d\u00f9ng \u0111ang \u0111\u01b0\u1ee3c m\u1edf r\u1ed9ng v\u00e0 s\u1ebd t\u1ea3i th\u00eam khi b\u1ea1n cu\u1ed9n.",
    showMoreUsers: "Hi\u1ec3n th\u1ecb th\u00eam",
    showPosts: "Hi\u1ec7n n\u1ed9i dung",
  },
}
