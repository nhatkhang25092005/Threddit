export const createTimelineSelector = (state) => {
  const getUsersTimelineIds = (username) =>
    state.contentList.usersPost?.[username] ?? [];

  const getUserTimelineList = (username) => {
    const ids = getUsersTimelineIds(username);
    const byId = state.timelineById ?? {};
    return ids.map((id) => byId[id]).filter(Boolean);
  };

  return {
    getUsersTimelineIds,
    getUserTimelineList,
  };
};