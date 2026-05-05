import { describe, it, expect } from "vitest";
import {
  addCommentToTree,
  removeCommentFromTree,
  countTotalComments,
  updateCommentReactionInTree,
  editCommentInTree,
  findCommentByIdInTree,
  mergeCommentPage
} from './commentTree.utils'

import type {
  CommentNode
} from './commentTree.utils'
const makeComment = (overrides: Record<string, any> = {}): CommentNode => ({
  id:1,
  level:0,
  parentId:null,
  text:"",
  media:[],
  author:{
    username:'murad',
    displayName:'Murad',
    avatarUrl:null,
  },
  replyTo:null,
  children:[],
  hasChildComment:false,
  viewer:{reaction:null},
  stats:{
    replyNumber:0,
    reactionNumber:0
  },
  meta:{
    isEdited:false,
    isOwner:false,
  },
  time:{
    createdAt:"2026-01-01T00:00:00.000Z",
    updatedAt:"2026-01-01T00:00:00.000Z",
  },
  ...overrides
})

describe('commentTree.utils',()=>{
  describe('countTotalComments',()=>{
    it('returns 0 for empty list', () => {
      expect(countTotalComments([])).toBe(0)
    })
    it('count nested comments', () => {
      const tree = [
        makeComment({id:1, children:[
          makeComment({id:11}),
          makeComment({id:12, children:[
            makeComment({id:121})
          ]})
        ]}),
        makeComment({id:2})
      ]
      expect(countTotalComments(tree)).toBe(5)
    })
  })
  
  describe("addCommentToTree", () => {
    it("adds a top-level comment when parentId is null", () => {
      const validComments = makeComment({id:1}) as CommentNode
      const appendComment = makeComment({id:2}) as CommentNode
      const expectResult = [appendComment, validComments]
      expect(
        addCommentToTree([validComments], appendComment, null))
          .toEqual(expectResult)
    });
    it("adds a reply to the correct parent", () => {
      const validComments = makeComment({id:1}) as CommentNode
      const appendComment = makeComment({id:11, parentId:1}) as CommentNode
      const expectResult = [
        {
          ...validComments,
          hasChildComment:true,
          stats:{
            ...validComments.stats,
            replyNumber:1
          },
          children: [
            {
              ...appendComment,
              parentId:1,
              level:0,
              replyTo:validComments.author
            }
          ]
        }
      ]
      expect(
        addCommentToTree([validComments], appendComment, 1)
      ).toEqual(expectResult)
    });
    it("returns unchanged tree when parent is not found", () => {
      const validComments = makeComment({id:1}) as CommentNode
      const appendComment = makeComment({id:21, parentId:2}) as CommentNode
      const expectResult = [validComments]
      expect(
        addCommentToTree([validComments], appendComment, 2)
      ).toEqual(expectResult)
    });
  });

  describe("removeCommentFromTree", () => {
    it("removes a leaf comment", () => {
      const validComments = makeComment({id:1, children:[
        makeComment({id:11})
      ]})
      const expectResult = {
        comments:[{...validComments, children: []}],
        removedCount:1
      }
      expect(
        removeCommentFromTree([validComments], 11)
      ).toEqual(expectResult)
    });
    it("removes a whole branch", () => {
      const validComments = makeComment({id:1, children:[
        makeComment({id:11, children:[
          makeComment({id:111})
        ]})
      ]})
      const expectResult = {
        comments:[],
        removedCount:3
      }
      expect(
        removeCommentFromTree([validComments], 1)
      ).toEqual(expectResult)
    });
    it("returns removedCount 0 when id does not exist", () => {
      const validComments = makeComment({id:1})
      const expectResult = {
        comments:[validComments],
        removedCount:0
      }
      expect(
        removeCommentFromTree([validComments], 2)
      ).toEqual(expectResult)
    });
  });

  describe("updateCommentReactionInTree", () => {
    it("updates reaction on a nested comment", () => {
      const tree = [
        makeComment({
          id: 1,
          children: [
            makeComment({
              id: 11,
              stats: {
                reactionNumber: 0,
                replyNumber: 0,
              },
            }),
          ],
        }),
      ]

      const result = updateCommentReactionInTree(tree, 11, "LIKE")

      expect(result[0].children[0].viewer.reaction).toBe("LIKE")
      expect(result[0].children[0].stats.reactionNumber).toBe(1)
    })
  })

  describe("editCommentInTree", () => {
    it("edits a nested comment by numeric id", () => {
      const tree = [
        makeComment({
          id: 1,
          children: [
            makeComment({
              id: 2,
              text: "old reply",
            }),
          ],
        }),
      ]

      const result = editCommentInTree(tree, 2, { text: "new reply" })

      expect(result[0].children[0].text).toBe("new reply")
      expect(result[0].children[0].meta.isEdited).toBe(true)
    })

    it("does not blank text when only media changes", () => {
      const tree = [
        makeComment({
          id: 1,
          text: "keep me",
        }),
      ]

      const result = editCommentInTree(tree, 1, {
        media: [{
          id: 1,
          type: "image",
          url: "https://example.com/a.png",
          contentType: "image/png",
          contentLength: 1,
          name: "a.png",
        }],
      })

      expect(result[0].text).toBe("keep me")
      expect(result[0].media).toHaveLength(1)
    })
  })

  describe('findCommentByIdInTree', () => {
    const comments =[
      makeComment({
        id:1,
        children:[
          makeComment({
            id:11,
            children:[
              makeComment({id:111})
            ]}
          )]
        }),
      ]
    it('should return 111',()=>{
      const result = findCommentByIdInTree(comments as CommentNode[], 111)
      expect(result.id).toBe(111)
    })

    it('should return null', () => {
      const result = findCommentByIdInTree(comments as CommentNode[], 999)
      expect(result).toBe(null)
    })
  })

  describe('mergeCommentPage', () => {
    it('should append the new comment to the end of the current comments array when the incoming comments are new', () => {
      const currentCommentsArray:CommentNode[] = [
        makeComment({id:1}) as CommentNode,
        makeComment({id:2}) as CommentNode
      ]
      const incomingCommentsArray:CommentNode[] = [
        makeComment({id:3}) as CommentNode,
        makeComment({id:4}) as CommentNode
      ]

      const result = mergeCommentPage(currentCommentsArray, incomingCommentsArray)
      expect(result).toEqual([...currentCommentsArray, ...incomingCommentsArray])
    })

    it('should override new data when merge an existed comment',() => {
      const currentCommentsArray:CommentNode[] = [
        makeComment({id:1, text:'hello', meta:{}}) as CommentNode,
      ]
      const incomingCommentsArray:CommentNode[] = [
        makeComment({id:1, text:'hi', meta:{}}) as CommentNode,
      ]

      const result = mergeCommentPage(currentCommentsArray, incomingCommentsArray)
      expect(result).toEqual(incomingCommentsArray)
    })
  })
})
