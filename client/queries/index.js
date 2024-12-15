import { gql } from "@apollo/client";

export const DO_LOGIN = gql`
  mutation Login($user: LoginInput!) {
    login(user: $user) {
      message
      token
    }
  }
`;

export const DO_REGISTER = gql`
  mutation Register($newUser: UserInput!) {
    register(newUser: $newUser) {
      message
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      _id
      name
      username
      email
      Followings {
        _id
        name
        username
        email
        createdAt
        updatedAt
      }
      Followers {
        _id
        name
        username
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      _id
      name
      username
      email
      Followings {
        _id
        name
        username
        email
        password
        createdAt
        updatedAt
      }
      Followers {
        _id
        name
        username
        email
        password
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      message
    }
  }
`;

export const LIKE_POST = gql`
  mutation CreateLike($inputLike: LikeInput!) {
    createLike(inputLike: $inputLike) {
      message
    }
  }
`;

export const COMMENT_POST = gql`
  mutation CreateComment($comment: CommentInput!) {
    createComment(comment: $comment) {
      message
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($postId: String!) {
    getPostById(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($follow: FollowInput!) {
    followUser(follow: $follow) {
      message
    }
  }
`;
