import { createContext, useContext } from "react";

export const StoryComposerContext = createContext(null);

export function useStoryComposerContext() {
  const context = useContext(StoryComposerContext);

  if (!context) {
    throw new Error("Story composer hooks must be used inside CreateStoryComposerProvider.");
  }

  return context;
}
