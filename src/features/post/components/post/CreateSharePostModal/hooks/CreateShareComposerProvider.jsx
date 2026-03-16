import { ShareComposerContext } from "./shareComposerContext";
import { useCreateShareComposer } from "./useCreateShareComposer";

export function CreateShareComposerProvider({ children, options }) {
  const composer = useCreateShareComposer(options);

  return (
    <ShareComposerContext.Provider value={composer}>
      {children}
    </ShareComposerContext.Provider>
  );
}
