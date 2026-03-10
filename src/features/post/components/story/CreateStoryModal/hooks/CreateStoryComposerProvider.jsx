import { StoryComposerContext } from "./storyComposerContext";
import { useCreateStoryComposer } from "./useCreateStoryComposer";

export function CreateStoryComposerProvider({ children }) {
  const composer = useCreateStoryComposer();

  return (
    <StoryComposerContext.Provider value={composer}>
      {children}
    </StoryComposerContext.Provider>
  );
}
