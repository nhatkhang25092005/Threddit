import {memo} from "react"
import SnackbarNotification from '../../notify/SnakeBarNotification'
import PostDetailModal from '../../../features/post/page/PostDetail'
import BlockContent from "../BlockContent"
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import PostActions from './PostActions'
import CommentList from "./CommentList"
import PostContent from "./PostContent"
import {usePost} from './hooks/usePost'

/**
 * Main Post Component
 * @param {Object} props
 * @param {Post} props.post - Post data object
 * @param {PostConfig} props.config - Configuration options
 * @param {PostHandlers} props.handlers - Event handlers
 * @param {CommentConfig} props.comments - Comment configuration
 */
const Post = memo(({
  post,
  config = {},
  handlers =  {},
  comments = {},
  sx = {}
}) => {
  const {
    isOwner = false,
    showPin = false,
    index = 0,
    totalPosts = 0,
    isModal = false,
  } = config

  const {
    list: commentList = [],
    onUpdate : onCommentUpdate,
    pagination: commentPagination
  } = comments

  const {
    state,
    actions,
    ui
  } = usePost(post.id, {
    initialData:post,
    isModal,
    isOwner,
    onResult : handlers.onResult,
    onPostUpdate: handlers.onPostUpdate
  })
  

  const isLastPost = (index === totalPosts - 1)
  const hasComments = commentList.length > 0

  return(
    <>
      {/* Post Detail Modal */}
      {ui.modal.open && (
        <PostDetailModal
          onOpen={ui.modal.open}
          onClose={(ui.closeModal)}
        />
      )}

      <BlockContent
        key = {post.id}
        customStyle={{
          ...sx,
          px: "1rem",
          bgcolor: "#0A0B0B",
          ...(isLastPost && { borderBottom: "none" })
        }}

        header={
          <PostHeader
            author={state.post.author}
            createdAt={state.post.createdAt}
            isPinned={state.isPinned}
            showPin={showPin}
            isOwner={isOwner}
            loading={state.loading.pin}
            onPin={actions.togglePin}
            onDelete={actions.delete}
            onEdit={actions.startEdit}
          />
        }
        footer={
          <PostFooter
            isLastPost={isLastPost}
            hasComments={hasComments}
          >
            <PostActions
              vote={{
                state:state.vote,
                score:state.score,
                onVote:actions.vote
              }}
              comment={{
                count:state.post.commentNumber,
                onClick:ui.openModal
              }}
              save={{
                postId:post.id,
                count:state.post.saveNumber,
                isSaved:state.post.isSaved,
              }}
              share={{
                postId:post.id,
                onShare:ui.setShareResult
              }}
            />
            {hasComments && (
              <CommentList
                comments={commentList}
                postId={post.id}
                pagination={commentPagination}
                onUpdate={onCommentUpdate}
                onResult={handlers.onResult}
              />
            )}
          </PostFooter>
        }
      >
        <PostContent
          content={state.post.content}
          isEditing={state.editing.active}
          editContent={state.editing.content}
          loading={state.loading.edit}
          onContentChange={actions.updateEditContent}
          onSave={actions.saveEdit}
          onCancel={actions.cancelEdit}
        />
      </BlockContent>
    </>
  )
})

Post.displayName = 'Post'
export default Post