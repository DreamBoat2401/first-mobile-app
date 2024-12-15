import { FollowModel } from "../models/followModel.js";

const followTypeDefs = `#graphql
    type Follow {
        _id: ID!
        followerId: ID!
        followingId: ID!
        createdAt: String
        updatedAt: String
    }    

    type Response {
        message: String
    }

    input FollowInput {
        followingId: ID!
    }

    type Query {
        follows: [Follow]
    }

    type Mutation {
        followUser(follow: FollowInput!): Response
    }
`;

const followResolvers = {
  Query: {
    follows: async () => {
      const follows = await FollowModel.findAll();
      return follows;
    },
  },
  Mutation: {
    followUser: async (_, { follow }, context) => {
      const { id } = await context.auth();
      const { followingId } = follow;
      const follows = await FollowModel.followUser({ followingId }, id);
      return follows;
    },
  },
};

export { followTypeDefs, followResolvers };
