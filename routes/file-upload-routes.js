const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//require the user model!!
const User = require('../models/User.model');


const uploader = require('../configs/cloudinary-setup');

router.post('/', uploader.single("imageUrl"), (req, res, next) => {
    // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  User.findByIdAndUpdate(req.session.currentUser._id, {profilePicture: req.file.path}).then(() => {
    res.json({ file_url: req.file.path });
  })

     // get path from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend

})

module.exports = router;