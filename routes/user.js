const router = require("express").Router();

const User = require("../models/User.model");

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose');


//////////// S I G N U P ___buddies  ///////////

router.post("/signup/buddy", (req, res, next) => {
  console.log("User input (buddy):", req.body);


  //storing the userinput 
  //usertype still undefined and needs to be preset for this formvalidation 
  const { username, email, password1, password2, birthday, city, hangingOut, dailyTasks, teaching, } = req.body;


  if (!username || !email || !password1 || !password2 || !birthday) {
    console.log("not all mandatory input is given..")
    res.json({ errorMessage: 'All fields are mandatory. Please provide all required input.' })
    return;
  }

  //checking the double passwordinput
  let password
  if (password1 === password2) {
    password = password1
  }
  else {
    res.json({ errorMessage: 'Please confirm your password again. An error occured.' })
    return;
  }

  //make sure passwords are strong
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500)
      .json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  let choiceOfAction = []

  //task: Storing in choiceOfAction which checkboxes are activated: dailyTasks/hangignOut/teaching
  if (dailyTasks === "on") {
    choiceOfAction.push('dailyTasks')
  }
  if (hangingOut == "on") {
    choiceOfAction.push('hangingOut')
  }
  if (teaching == "on") {
    choiceOfAction.push('teaching')
  }

  //editing the city so that it always starts with a uppercase letter:
  function capitalizeFirstLetter(cityName) {
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
  }

  //creating the according data in db, but using the encrypted version:
  //generate salt
  const salt = bcrypt.genSaltSync(saltRounds);
  //create a hashed version of the password:
  const hash1 = bcrypt.hashSync(password, salt);

  console.log("creating user ...")
  User.create({ username: username, email: email, passwordHash: hash1, usertype: "buddy", city: capitalizeFirstLetter(city), birthday: birthday, choiceOfAction: choiceOfAction, profileInput: {}, profileImage: "" })

    .then(userFromDB => {
      console.log('A new buddy has joined the pool: ', userFromDB);
      res.status(200)
        .json(userFromDB)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500)
          .json({
            errorMessage: error.message
          });
      } else if (error.code === 11000) {
        res.status(500)
          .json({
            errorMessage: 'Username and email need to be unique. Either username or email is already used.'
          });
      }
      else {
        next(error);
      }
    });
})


//////////// Only for logged in ___buddies: ///////////

//user profile route
router.get('/buddyView', (req, res) => {
  if (!req.session.currentUser) {
    res.json({ errorMessage: 'We are sorry, you re just able to see this if you are logged in' })
  }
  else {
    User.find({ city: req.session.currentUser.city, usertype: 'inNeed' })
      .then(users => {
        let allUsersExceptMe = users.filter(e => {
          return e.email !== req.session.currentUser.email
        })
        console.log("TigersFromSameCity", allUsersExceptMe);
        res.json(allUsersExceptMe)
      })
  }
});


//buddy can check on specific tiger details:
router.get('/tigerslist/:id', (req, res) => {
  if (!req.session.currentUser) {
    res.json({ errorMessage: 'We are sorry, you re just able to see this if you are logged in' })
  }
  else {
    User.findById(req.params.id).then(response => {
      console.log("=================>", response)
      res.status(200).json(response);
    })
      .catch(err => {
        res.json(err);
      })
  }
})



/////////////////////// T I G E R S ///////////////////////////////

//////////// S I G N U P ___tigers  ///////////


router.post("/signup/tiger", (req, res, next) => {
  console.log("User input (tiger):", req.body);

  //storing the userinput 
  //usertype still undefined and needs to be preset for this formvalidation 
  const { username, email, password1, password2, birthday, city, hangingOut, dailyTasks, teaching } = req.body;

  if (!username || !email || !password1 || !password2 || !birthday) {
    res.json({ errorMessage: 'All fields are mandatory. Please provide all required input.' })
    return;
  }

    //checking the double passwordinput
  let password
  if (password1 === password2) {
    password = password1
  }
  else {
    res.json({ errorMessage: 'Please confirm your password again.' })
    return;
  }

  let choiceOfAction = []
  //task: Storing in choiceOfAction which checkboxes are activated: dailyTasks/hangignOut/teaching
  if (dailyTasks === "on") {
    choiceOfAction.push('dailyTasks')
  }
  if (hangingOut == "on") {
    choiceOfAction.push('hangingOut')
  }
  if (teaching == "on") {
    choiceOfAction.push('teaching')
  }


  //make sure passwords are strong
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500)
      .json({ errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }
  //creating the according data in db, but using the encrypted version:
  //generate salt
  const salt = bcrypt.genSaltSync(saltRounds);
  //create a hashed version of the password:
  const hash1 = bcrypt.hashSync(password, salt);

  //editing the city so that it always starts with a uppercase letter:
  function capitalizeFirstLetter(cityName) {
    return cityName.charAt(0).toUpperCase() + cityName.slice(1);
  }

  User.create({ username: username, email: email, passwordHash: hash1, usertype: "inNeed", city: capitalizeFirstLetter(city), birthday: birthday, choiceOfAction: choiceOfAction })

    .then(userFromDB => {
      console.log('A new buddy has joined the pool: ', userFromDB);
      res.status(200)
        .json(userFromDB);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500)
          .json({
            errorMessage: error.message
          });
      } else if (error.code === 11000) {
        res.status(500)
          .json({
            errorMessage: 'Username and email need to be unique. Either username or email is already used.'
          });
      }
      else {
        next(error);
      }
    });
})


//////////// Only for logged in ___tigers: ///////////

//user profile route
router.get('/tigerView', (req, res) => {
  if (!req.session.currentUser) {
    res.json({ errorMessage: 'We are sorry, you re just able to see this if you are logged in' })
  }
  else {
    User.findById(req.session.currentUser._id).then((user) => {
      res.json({
        userInSession: user
      });
    })
  }
});

router.post('/tigerView', (req, res) => {

  const userID = req.session.currentUser._id
  console.log("bla bla =====>", userID)
  User.findByIdAndUpdate(userID, {
    username: req.body.username,
    city: req.body.city,
    choiceOfAction: req.body.choiceOfAction,
    profileInput: {
      tigerIntro: req.body.tigerIntro,
      helpDef: req.body.helpDef
    },
  })
    .then((user) => {
      console.log("user", user)
      res.status(200)
        .json(user)
    }).catch(err => {
      console.log("error with edit profile", err)
    });
});


//////////// L O G I N ////////////
//  dependency: 
//  ---------if user == tiger => display tigerView
//  ---------if user == buddy => display buddyView



// .post() login route ==> to process form data
router.post('/login', (req, res, next) => {
  console.log('SESSION ====> ', req.session);
  const { email, password } = req.body;

  //user input not complete
  if (email === '' || password === '') {
    res.json({
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
  //look for the corresponding user in the data:
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.json({ errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcrypt.compareSync(password, user.passwordHash)) {

        //******* SAVE THE USER IN THE SESSION ********//

        ////////////////////////////////
        /////////////////////////////////
        //differentiate between buddy and tiger view in session function          
        req.session.currentUser = user;
        if (user.usertype === 'buddy') {
          res.json({ user: user });
        }
        else if (user.usertype === 'inNeed') {
          res.json({ user: user });
        }
      } else {
        res.json({ errorMessage: 'Incorrect password' });
      }
    })
});


//////////// L O G O U T ///////////
router.post('/logout', (req, res) => {
  req.session.destroy();
  // req.session.destroy(req.sessionID);
  res.json({ message: "logout worked" });
});


router.get('/checkuser', (req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id).then((foundUser) => {
      res.json({ userDoc: foundUser });
    })
  } else {
    res.json({ userDoc: null });
  }
})


//////////// GET USER /////////// (used for messenger/ -> FE: Comversation.js)
//double check if correctly adapted..
//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////// DELETE USER ///////////
router.delete('/delete', (req, res) => {
  // const { userID } = req.params.id;
  User.findOneAndDelete({ _id: req.session.currentUser._id }).then(() => {
    console.log('got deleted');
    res.json({ msg: 'success' })
  })

})




module.exports = router;