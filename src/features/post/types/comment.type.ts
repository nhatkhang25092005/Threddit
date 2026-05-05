import { Media } from "./media.type"
import type { Author } from "./author.interface"
import { Reaction } from "./reaction.type"
// still confuse in the correct data of comment
export type Comment = {
  id:number | null
  text:string,
  createdAt:string | null
  updatedAt:string | null
  commenter:Author
  isCommenter:boolean
  parentCommenter:string,
  hasChildComment:boolean
  parentCommentId:number | null
  reaction:Reaction | null
  reactionNumber: number | null
  mediaFiles: Media[],
  mentionedUsers:string[]
}

export type ExpectCommenterInput = Partial<{
  username: unknown
  displayName: unknown
  avatarUrl: unknown
}>

export type RawCommentInput = Partial<{
  id:number | null
  text:unknown
  createdAt:unknown
  updatedAt:unknown
  commenter:unknown
  isCommenter:unknown
  parentCommenter:unknown
  hasChildComment:unknown
  reaction:unknown
  reactionNumber:unknown
  parentCommentId:number | null
  mediaFiles:unknown
  mentionedUsers:unknown,
  stats:{
    reactionNumber?:unknown
  }
  media:unknown
}>

export interface UpdateCommentProps{
  text:string
  media:Media[]
}

export type UpdateCommentPatch = Partial<{
  text:string,
  createdAt:string | null,
  updatedAt:string | null,
  commenter:Author,
  isCommenter:boolean,
  parentCommentId:number | null,
  hasChildComment:boolean,
  reaction:Reaction | null,
  mediaFiles:Media[],
  reactionNumber?:number,
  mentionedUsers:string[]
}>
