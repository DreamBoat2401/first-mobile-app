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

    type message {
        message: String!
    }

    type Query {
        users: [User]
    }
`;

const userResolvers = {
  Query: {
    users: async (_, { search }) => {
      const users = await UserModel.findAll(search);
      return users;
    },
  },
  Mutation: {
    register: async (_, { user }) => {
      const result = await UserModel.create(user);
      return result;
    },
    // login: async (_, , ___) => {
    //   const result = await UserModel.login();
    //   return result;
    // },
  },
};

export { userTypeDefs, userResolvers };
