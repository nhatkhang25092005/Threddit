export const common = {
  actions: {
    close: "Close",
    back: "Back",
    done: "Done",
    confirm: "Confirm",
    loadMore: "Load more",
  },
  expandableContent: {
    collapse: "Collapse ▲",
    expand: "Show more ▼",
  },
  share: {
    copiedLink: "Link copied!",
  },
  notFound: {
    title: "Page not found?",
    description: "Looks like you're lost ~~",
  },
  accessibility: {
    logoAlt: "Logo",
    backgroundAlt: "Background image",
  },
  time: {
    justNow: "Just now",
    minutesAgo: (value) => `${value} minutes ago`,
    hoursAgo: (value) => `${value} hours ago`,
    daysAgo: (value) => `${value} days ago`,
    weeksAgo: (value) => `${value} weeks ago`,
    monthsAgo: (value) => `${value} months ago`,
    yearsAgo: (value) => `${value} years ago`,
  },
}
