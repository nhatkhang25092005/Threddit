export function getTimelineList(timelineItems) {
  if (!Array.isArray(timelineItems)){
    console.warn(`timelineItems in getTimelineList is ${timelineItems}`)
    return []
  }
  
  return timelineItems
    .map(item => item?.timelineItemId)
    .filter(id => id != null);
}
