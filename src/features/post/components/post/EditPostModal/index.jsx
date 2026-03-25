import CreatePostModal from "../CreatePostModal";
import { composerText } from "../../../../../constant/text/vi/post/composer.text";
import { usePostContext } from "../../../hooks";

export default function EditPostModal({ onClose, postId }) {
  const {
    selector: {
      post: { getPostById }
    }
  } = usePostContext();

  const post = getPostById(postId);

  if (!post || post.id == null) {
    return null;
  }

  return (
    <CreatePostModal
      onClose={onClose}
      mode="edit"
      contentId={post.id}
      initialText={post.text || ""}
      initialMedia={post.mediaFiles || []}
      title={composerText.post.editTitle}
      submitLabel={composerText.post.editSubmitLabel}
      closeAlertTitle={composerText.post.closeAlert.edit.title}
      closeAlertMessage={composerText.post.closeAlert.edit.message}
    />
  );
}
