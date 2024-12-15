import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, userResolvers } from "./schemas/userSchema.js";
import { postTypeDefs, postResolvers } from "./schemas/postsSchema.js";
import { followTypeDefs, followResolvers } from "./schemas/followSchema.js";
import { auth } from "./utils/auth.js";
import "dotenv/config";

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req }) => ({ auth: () => auth(req) }),
});

console.log(`🚀  Server ready at: ${url}`);
