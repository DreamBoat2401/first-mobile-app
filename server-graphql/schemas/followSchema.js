const followTypeDefs = `#graphql
    type Follow {
        _id: ID!
        followerId: ID!
        followingId: ID!
        createdAt: String
        updatedAt: String
    }    
    type Query { 
        follows: [Follow]
    }    
    type Mutation {
        
    }    
`;

const followResolvers = {
  Query: {},
};

export { followTypeDefs, followResolvers };
