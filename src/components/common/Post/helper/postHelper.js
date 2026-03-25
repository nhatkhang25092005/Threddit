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
    bgcolor: '#071120',
    ...(index === createdPostsLength - 1 || onComment
      ? { borderBottom: 'none' }
      : { borderBottom: 'solid #94A3B8 1px' }),
  };
}