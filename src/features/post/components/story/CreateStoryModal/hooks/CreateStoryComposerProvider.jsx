import { StoryComposerContext } from "./storyComposerContext";
import { useCreateStoryComposer } from "./useCreateStoryComposer";

export function CreateStoryComposerProvider({ children, options }) {
  const composer = useCreateStoryComposer(options);

  return (
    <StoryComposerContext.Provider value={composer}>
      {children}
    </StoryComposerContext.Provider>
  );
}
