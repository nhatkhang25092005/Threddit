export function getPostList(postItems) {
  if (!Array.isArray(postItems)){
    console.warn(`postItems in getPostList is ${postItems}`)
    return []
  }
  
  return postItems
    .map(item => item?.id)
    .filter(id => id != null);
}
