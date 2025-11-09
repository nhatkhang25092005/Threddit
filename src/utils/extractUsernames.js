export function extractUsernames(text) {
  if (!text || typeof text !== 'string') return [];
  
  const usernameRegex = /(?:^|\s)@([\w.]+)/g;
  const matches = text.matchAll(usernameRegex);
  
  const usernames = [...matches].map(match => match[1]);
  return [...new Set(usernames)];
}