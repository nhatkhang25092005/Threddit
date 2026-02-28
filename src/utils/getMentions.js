export function getMentions(text) {
  if (!text) return [];
  const regex = /@([a-zA-Z0-9_]+)/g;
  const mentions = [];
  let match;
  while ((match = regex.exec(text)) !== null) mentions.push(match[1]);
  return mentions;
}