export function parseLineHeight(computedStyle) {
  const raw = Number.parseFloat(computedStyle.lineHeight);
  if (!Number.isNaN(raw)) return raw;

  const fontSize = Number.parseFloat(computedStyle.fontSize) || 16;
  return fontSize * 1.2;
}