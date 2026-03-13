export function getStorySource(source) {
  return source === 'pinned' ? 'pinned' : 'current'
}

export function getStoryPageMeta(source) {
  if (source === 'pinned') {
    return {
      eyebrow: 'Pinned story',
      subtitle: 'Danh sach story da ghim tren ho so',
      title: 'Story pinned',
    }
  }

  return {
    eyebrow: 'Current story',
    subtitle: 'Story hien tai cua nguoi dung',
    title: 'Story list',
  }
}
