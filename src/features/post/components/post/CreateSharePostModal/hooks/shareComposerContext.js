import { createContext, useContext } from "react";

export const ShareComposerContext = createContext(null);

export function useShareComposerContext() {
  const context = useContext(ShareComposerContext);

  if (!context) {
    throw new Error("Share composer hooks must be used inside CreateShareComposerProvider.");
  }

  return context;
}
