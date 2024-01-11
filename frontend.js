// //Query data on frontend
// query ExampleQuery($id:ID!) {
//     game(id: $id) {
//       title,
//       reviews {
//         rating,content
//       }
//     }
   
//   }

// //delete data
//   mutation DeleteMutation($id:ID!){
//     deleteGame(id: $id) {
//       id,title
//     }
//   }

//   //add data
//   mutation AddMutation($game:AddGameInput!){
//     addGame(game: $game) {
//       id,title
//     }
//   }

//   //edit data
//   mutation EditMutation($edits:EditGameInput!,$id:ID!){
//     updateGame(edits: $edits,id:$id) {
//       id,
//       title
//     }
//   }