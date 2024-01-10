import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import _db from './_db.js';

//whatever we define in "Query" of typedefs, is going to have a resolver function,the resolver basically contains the logic to get the data and return the data to the client based on the specified query 
const resolvers={
    Query:{
        games(){
            return _db.games
        },
        reviews(){
            return _db.reviews
        },
        authors(){
            return _db.authors
        },
        review(_,args){
            return _db.reviews.find((review)=>args.id===review.id)
        },
        game(_,args){
            return _db.games.find((game)=>game.id===args.id)
        },
        author(_,args){
            return _db.authors.find((author)=>author.id===args.id)
        }
    }
}

//typeDefs is basically the structure of the data with their attributes and types[backend schema, not DB schema]
//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})
const {url}=await startStandaloneServer(server,{
    listen:{port:4000}
})
console.log('Server ready at port 4000')