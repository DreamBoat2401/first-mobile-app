const postTypeDefs = `#graphql
    type Post {
        _id: ID!
        content: String!
        imgUrl: String
        createdAt: String
        updatedAt: String
    }    
    type Query { 
        posts: [Post]
    }    
    type Mutation {
        
    }    
`;

const postResolvers = {
  Query: {},
};

// export { postTypeDefs, postResolvers };
