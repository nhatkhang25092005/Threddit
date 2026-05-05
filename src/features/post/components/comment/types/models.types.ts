import type { Author } from "@/features/post/types/author.interface";

export interface CommentItem {
  rootLevel?:number,
  rootParentAuthor?: Author | null,
  rootParentId?:number | null,
  viewerUsername?: string | null
}

export interface NormalizeCommentItem {
  level?: number,
  parentId?:number | null,
  parentAuthor?:Author | null,
  viewerUsername?: string | null
}
