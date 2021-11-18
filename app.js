require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require('express-session');
const cors = require("cors");





const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
// use session: 
//require('./configs/session-configs')(app);


//mongoose:
//already preset:
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


//added mongoose code:
const MongoStore = require('connect-mongo');
app.use(session({
  secret: "doesn't matter in our case",
  resave: false,
  saveUnitialized: false,
  useUnifiedTopology: true,
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI})
}))

// allow access to the API from different domains/origins
app.use(cors({
  // this could be multiple domains/origins, but we will allow just our React app
  origin: [ "http://localhost:3000" ]
}));


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'GoBuddyApp - Generated with IronGenerator';



/// messenger backend located in www-file



const index = require('./routes/index');
app.use('/', index);

app.use('/api/user', require('./routes/user'))
app.use('/api/upload', require('./routes/file-upload-routes'));
app.use('/api/conversations', require('./routes/conversations'))
app.use('/api/messages', require('./routes/messages'))


app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;
