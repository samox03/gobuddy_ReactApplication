const { Schema, model } = require("mongoose");


//former message schema:
// const messageSchema = new Schema(
//   {
//     receiver: { type: Schema.Types.ObjectId, ref: "User" },
//     sender: { type: Schema.Types.ObjectId, ref: "User" },
//     content: String,
//   },
//   {
//     timestamps: true
//   }
// );




//Alternatively just store the conversationId, the senderId and the content here:
const messageSchema = new Schema(
  {
    conversationId: {
      type: String
    },
    sender: {
      type: String
    },
    text: {
      type: String
    },
  },
  {
    timestamps: true
  }
);






module.exports = model('Message', messageSchema);



