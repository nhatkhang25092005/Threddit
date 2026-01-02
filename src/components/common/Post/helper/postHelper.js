export function normalizeItem(item){
  const { isSave, isSaved, ...rest } = item;
  return {
    ...rest,
    isSaved: isSaved ?? isSave ?? false,
  };
}

export function getPostStyles(index, createdPostsLength, onComment) {
  return {
    px: '1rem',
    bgcolor: '#0A0B0B',
    ...(index === createdPostsLength - 1 || onComment
      ? { borderBottom: 'none' }
      : { borderBottom: 'solid #BCBDBF 1px' }),
  };
}