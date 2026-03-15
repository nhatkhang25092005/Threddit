import CreatePostModal from "../CreatePostModal";
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
      title="Chỉnh sửa bài viết"
      submitLabel="Xác nhận chỉnh sửa"
      closeAlertTitle="Đóng chỉnh sửa?"
      closeAlertMessage="Nếu đóng bây giờ, những thay đổi của bài viết sẽ không được lưu."
    />
  );
}
