import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs, userResolvers } from "./schemas/userSchema.js";
// import { postTypeDefs, postResolvers } from "./schemas/postsSchema.js";
import { auth } from "./utils/auth.js";

// import { authentication, authorization } from "./utils/auth.js";

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  resolvers: [],
  introspection: true,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  //   context: async ({ req }) => ({ authentication, authorization, req }),
});

console.log(`🚀  Server ready at: ${url}`);
