import { UserModel } from "../models/userModel.js";

const userTypeDefs = `#graphql
    type User {
        _id: ID!
        name: String!
        username: String!
        email: String!
        password: String!
        createdAt: String
        updatedAt: String
    }

    type GeneralResponse {
        message: String!
    }

    type LoginResponse {
        message: String!
        token: String!
    }

    type message {
        message: String!
    }

    input GetUserByIdInput {
      userId: String!
    }

    input UserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type getUserByIdResponse {
      _id: ID!
      name: String!
      username: String!
      email: String!
      Followings: [User]
      Followers: [User]
    }

    type Query {
        users: [User]
        getUserById(userId: String!): getUserByIdResponse
        getProfile: getUserByIdResponse
    }

    type Mutation {
        register(newUser: UserInput!): GeneralResponse!
        login(user: LoginInput!): LoginResponse!
    }
`;

const userResolvers = {
  Query: {
    users: async (_, { search }) => {
      const users = await UserModel.findAll(search);
      return users;
    },
    getUserById: async (_, { userId }, context) => {
      await context.auth();

      const user = await UserModel.findById(userId);
      return user;
    },
    getProfile: async (_, args, context) => {
      const { id } = await context.auth();

      const user = await UserModel.getProfile(id);

      return user;
    },
  },
  Mutation: {
    register: async (_, { newUser }) => {
      const result = await UserModel.create(newUser);

      return result;
    },

    login: async (_, { user }) => {
      const result = await UserModel.login(user);
      return result;
    },
  },
};

export { userTypeDefs, userResolvers };
