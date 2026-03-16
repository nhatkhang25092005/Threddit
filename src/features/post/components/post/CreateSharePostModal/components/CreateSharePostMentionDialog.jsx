import MentionListModal from "../../../shared/MentionListModal";
import { useShareMentionDialogData } from "../hooks";

export default function CreateSharePostMentionDialog() {
  const {
    handleCloseMentionList,
    isMentionListOpen,
    mention,
  } = useShareMentionDialogData();

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
