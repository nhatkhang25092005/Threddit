export function sortPinned(posts){
    return posts.sort((a,b)=> (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
}