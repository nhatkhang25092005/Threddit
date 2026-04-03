export const searchText = {
  field: {
    submitAriaLabel: "Submit search",
    placeholder: "Search...",
    keywordAriaLabel: "Search keyword",
    closeAriaLabel: "Close search",
    previewEyebrow: "Searching",
  },
  page: {
    eyebrow: "Search",
    titleWithQuery: (query) => `Results for "${query}"`,
    emptyTitle: "Start with a specific keyword",
    promptDescription:
      "Open the search box in the sidebar and submit a keyword to see matching content and users.",
    resultsDescription: (userCount, postCount) => (
      `${userCount} users and ${postCount} posts are being shown for this keyword.`
    ),
    userResultsDescription: (count) => (
      `${count} users are being shown for this keyword.`
    ),
    pendingDescription:
      "The system is querying and sorting the most relevant results.",
    emptyDescription:
      "No matching content or users were found for this keyword.",
    promptMessage:
      "Enter a keyword in the search box to get started.",
    noResultMessage: (query) => (
      `No matching results found for "${query}".`
    ),
    noPostMessage: (query) => (
      `No matching content found for "${query}".`
    ),
    usersSectionTitle: (count) => `Related accounts (${count})`,
    usersSectionDescription:
      "At most 3 accounts are shown in the quick preview list.",
    usersExpandedDescription:
      "The user list is expanded and will load more as you scroll.",
    showMoreUsers: "Show more",
    showPosts: "Show posts",
  },
}
