const router = require("express").Router();
const Conversation = require('../models/Conversations.model')

//new conv
//on conversation route..
router.post("/", async (req, res) => {

  //create new conversation object in DB
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation)
    console.log("New conversation: ", savedConversation)
  } catch (err) {
    console.log("err===>", err)
    res.status(500).json(err)
  }

})

//get conversations of a user
router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] }
    });
    res.status(200).json(conversation)
    console.log("conversation: ", conversation)
  } catch (err) {
    console.log("err===>", err)
    res.status(500).json(err)
  }
})


module.exports = router