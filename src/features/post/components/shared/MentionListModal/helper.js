export function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function removeMentionFromText(text, username){
  const u = escapeRegExp(username);
  text = text.replace(new RegExp(`(^|\\s)@${u}(?=\\s|$)`, "g"), "$1");
  text = text.replace(/\s{2,}/g, " ").trimStart();

  return text;
}

export function insertMentionsToTextarea(mention, newMentions, oldMentions) {
  const textarea = mention?.bind?.ref?.current;
  if (!textarea) return;

  const currentValue = textarea?.value ?? mention?.value ?? "";

  const oldSet = new Set(oldMentions || []);
  const newSet = new Set(newMentions || []);

  const removed = [...oldSet].filter((u) => !newSet.has(u));
  const added = [...newSet].filter((u) => !oldSet.has(u));

  let nextValue = currentValue;
  removed.forEach((u) => {
    nextValue = removeMentionFromText(nextValue, u);
  });

  if (added.length) {
    const suffixSpace = nextValue && !/\s$/.test(nextValue) ? " " : "";
    const inserted = added.map((u) => `@${u}`).join(" ");
    nextValue = `${nextValue}${suffixSpace}${inserted}`;
  }

  mention?.setValue?.(nextValue);

  // đặt caret cuối
  requestAnimationFrame(() => {
    textarea.focus();
    const caretIndex = nextValue.length;
    textarea.setSelectionRange(caretIndex, caretIndex);
  });
}

export function toggleFriend(prevObj, username) {
  const current = prevObj?.[username];
  if (!current) return prevObj;
  return {
    ...prevObj,
    [username]: { ...current, isChoose: !current.isChoose },
  };
}

export function normalizeFriends(list, selectedUsernames = []) {
  const selectedSet = new Set(selectedUsernames);
  const obj = {};
  list.forEach((item) => {
    obj[item.username] = {
      ...item,
      isChoose: selectedSet.has(item.username),
    };
  });
  return obj;
}

export function getDefaultMentions(text) {
  if (!text) return [];
  const regex = /@([a-zA-Z0-9_]+)/g;
  const mentions = [];
  let match;
  while ((match = regex.exec(text)) !== null) mentions.push(match[1]);
  return mentions;
}
