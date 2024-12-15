import { PostModel } from "../models/postModel.js";
import { redis } from "../config/redis.js";

const postTypeDefs = `#graphql

    type Comment {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Like {
        username: String
        createdAt: String
        updatedAt: String
    }   

    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt:String
    }

    input PostInput {
        content: String!
        imgUrl: String
        tags: [String]
        authorId: ID
    }

    input CommentInput {
        postId: ID!
        content: String!
    }

    input getPostByIdInput {
        postId: String!
    }

    type Response {
        message: String
    }

    type Query { 
        getPosts: [Post]
        getPostById(postId: String!): Post
    }    

    input LikeInput {
        postId: ID!
    }

    type Mutation {
        createPost(post: PostInput!): Response
        createComment(comment: CommentInput!): Response
        createLike(inputLike: LikeInput!): Response
    }    
`;

const postResolvers = {
  Query: {
    getPosts: async (_, {}, context) => {
      await context.auth();

      const cachedPosts = await redis.get("posts");
      if (cachedPosts) {
        return JSON.parse(cachedPosts);
      }

      const posts = await PostModel.findAll();
      await redis.set("posts", JSON.stringify(posts));

      return posts;
    },
    getPostById: async (_, { postId }, context) => {
      await context.auth();

      const cachedPost = await redis.get(`post:${postId}`);
      if (cachedPost) {
        return JSON.parse(cachedPost);
      }

      const post = await PostModel.findById(postId);
      await redis.set(`post:${postId}`, JSON.stringify(post));
      return post;
    },
  },
  Mutation: {
    createPost: async (_, { post }, context) => {
      const { id } = await context.auth();
      const newPost = await PostModel.create({ ...post, authorId: id });

      await redis.del("posts");

      return newPost;
    },
    createLike: async (_, { inputLike }, context) => {
      const { username } = await context.auth();

      const like = await PostModel.like(inputLike.postId, username);

      await redis.del("posts");
      await redis.del(`post:${inputLike.postId}`);

      return like;
    },
    createComment: async (_, { comment }, context) => {
      const { postId, content } = comment;
      const { username } = await context.auth();
      const newComment = await PostModel.comment({ content, postId }, username);

      await redis.del("posts");
      await redis.del(`post:${postId}`);
      return newComment;
    },
  },
};

export { postTypeDefs, postResolvers };
