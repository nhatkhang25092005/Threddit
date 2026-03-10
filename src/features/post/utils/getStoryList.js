export function getStoryList(storyItems) {
  if (!Array.isArray(storyItems)){
    console.warn(`storyItems in getStoryList is ${storyItems}`)
    return []
  }
  
  return storyItems
    .map(item => item?.id)
    .filter(id => id != null);
}
