import MentionListModal from "../../../shared/MentionListModal";
import { useStoryMentionDialogData } from "../hooks";

export default function CreateStoryMentionDialog() {
  const {
    handleCloseMentionList,
    isMentionListOpen,
    mention,
  } = useStoryMentionDialogData();

  if (!isMentionListOpen) {
    return null;
  }

  return (
    <MentionListModal
      mention={mention}
      onClose={handleCloseMentionList}
    />
  );
}
