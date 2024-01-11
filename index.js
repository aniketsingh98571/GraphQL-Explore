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
    },
    Game:{
        //parent means that our entry point Query above, first the query will hit game then from game, we will reach here, and the parent will give id of the game, which we will use to compare from review id
        reviews(parent){
            return _db.reviews.filter((review)=>parent.id===review.game_id)
        }
    },
    Author:{
        reviews(parent){
            return _db.reviews.filter((review)=>parent.id===review.author_id)
        }
    },
    Review:{
        author(parent){
            return _db.authors.find((author)=>author.id===parent.author_id)
        },
        game(parent){
            return _db.games.find((game)=>game.id===parent.game_id)
        },
    },
    Mutation:{
        deleteGame(_,args){
          return  _db.games.filter((game)=>game.id!==args.id)
        },
        addGame(_,args){
            let game={...args.game,id:Math.floor(Math.random()*1000)}
            let games=[..._db.games]
            games.push(game)
            return game
        },
        updateGame(_,args){
            const db=_db.games.map((game)=>{
                if(game.id===args.id){
                    return {...game,...args.edits}
                }
                return game
            })
            return db.find((game)=>game.id===args.id)
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