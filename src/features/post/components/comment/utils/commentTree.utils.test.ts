import { describe, it, expect } from "vitest";
import {
  addCommentToTree,
  removeCommentFromTree,
  countTotalComments,
  updateCommentReactionInTree,
  editCommentInTree
} from './commentTree.utils'

const makeComment = (overrides = {}) => ({
  id:'c1',
  level:0,
  parentId:null,
  author:{
    username:'murad',
    displayName:'Murad'
  },
  children:[],
  hasChildComment:false,
  viewer:{reaction:null},
  stats:{
    replyNumber:0,
    reactionNumber:0
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
        makeComment({id:'c1', children:[
          makeComment({id:'c1-1'}),
          makeComment({id:'c1-2', children:[
            makeComment({id:'c1-2-1'})
          ]})
        ]}),
        makeComment({id:'c2'})
      ]
      expect(countTotalComments(tree)).toBe(5)
    })
  })
  
  describe("addCommentToTree", () => {
    it("adds a top-level comment when parentId is null", () => {
      const validComments = makeComment({id:'c1'})
      const appendComment = makeComment({id:'c2'})
      const expectResult = [appendComment, validComments]
      expect(
        addCommentToTree([validComments], appendComment, null))
          .toEqual(expectResult)
    });
    it("adds a reply to the correct parent", () => {
      const validComments = makeComment({id:'c1'})
      const appendComment = makeComment({id:'c1-1', parentId:'c1'})
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
              parentId:'c1',
              level:0,
              replyTo:validComments.author
            }
          ]
        }
      ]
      expect(
        addCommentToTree([validComments], appendComment, 'c1')
      ).toEqual(expectResult)
    });
    it("returns unchanged tree when parent is not found", () => {
      const validComments = makeComment({id:'c1'})
      const appendComment = makeComment({id:'c2-1', parentId:'c2'})
      const expectResult = [validComments]
      expect(
        addCommentToTree([validComments], appendComment, 'c2')
      ).toEqual(expectResult)
    });
  });

  describe("removeCommentFromTree", () => {
    it("removes a leaf comment", () => {
      const validComments = makeComment({id:'c1', children:[
        makeComment({id:'c1-1'})
      ]})
      const expectResult = {
        comments:[{...validComments, children: []}],
        removedCount:1
      }
      expect(
        removeCommentFromTree([validComments], 'c1-1')
      ).toEqual(expectResult)
    });
    it("removes a whole branch", () => {
      const validComments = makeComment({id:'c1', children:[
        makeComment({id:'c1-1', children:[
          makeComment({id:'c1-1-1'})
        ]})
      ]})
      const expectResult = {
        comments:[],
        removedCount:3
      }
      expect(
        removeCommentFromTree([validComments], 'c1')
      ).toEqual(expectResult)
    });
    it("returns removedCount 0 when id does not exist", () => {
      const validComments = makeComment({id:'c1'})
      const expectResult = {
        comments:[validComments],
        removedCount:0
      }
      expect(
        removeCommentFromTree([validComments], 'c2')
      ).toEqual(expectResult)
    });
  });

  describe("updateCommentReactionInTree", () => {

  })
})