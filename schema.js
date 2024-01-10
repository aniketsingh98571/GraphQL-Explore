//defining backend schema contracts, note:-this is not DB schema but Graphql's Schema
//! mark denotes that field is required
//Query, is what client is going to query the data for, and get results. you can think of Query as endpoints of GraphQL that client is going to use to get data, although graphql has only one endpoint.
//We use Type to define the schema that we are going to serve to frontend
export const typeDefs=`#graphql
    type Game {
        id:ID!,
        title:String,
        platform:[String]
        reviews: [Review!]
    }
    type Review {
        id:ID!,
        rating:Int!,
        content:String!
        game:Game!
        author:Author!
    }
    type Author {
        id:ID!,
        name:String!,
        verified:Boolean!
        reviews: [Review!]
    }
    type Query{
        reviews: [Review]
        review(id:ID!):Review
        games: [Game]
        game(id:ID!):Game
        authors: [Author]
        author(id:ID!):Author
    }

`

//types of data in graphql--->int,float,String,boolean,ID