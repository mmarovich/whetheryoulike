const path = require('path');
const express = require('express');

const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { DATABASE_URL, TEST_DATABASE_URL } = require('./config/database.js');
// const nev = require('email-verification')(mongoose);
const User = require('./routes/models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');

const app = express();

require('./config/passport')(passport)

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  name: 'Session',
  resave: true,
  saveUninitialized: true,
  secret: 'forty-two',
  store: new MongoStore({
    url: DATABASE_URL,
    autoReconnect: true
  })
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/test', (req, res) => {
  res.send('Hello world');
})

//////////////// nev
// var myHasher = function (password, tempUserData, insertTempUser, callback) {
//   console.log(arguments);
//   var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return insertTempUser(hash, tempUserData, callback);
// };

// function setUpNev() {

//   nev.configure({
//     verificationURL: 'https://rocky-escarpment-61736.herokuapp.com/api/email-verification/${URL}',
//     URLLength: 48,

//     // mongo-stuff
//     persistentUserModel: User,
//     // tempUserModel: TempUser,
//     // tempUserCollection: 'temporary_users',
//     emailFieldName: 'email',
//     passwordFieldName: 'password',
//     URLFieldName: 'GENERATED_VERIFYING_URL',
//     expirationTime: 86400,
//     hashingFunction: myHasher,
//     // emailing options
//     transportOptions: {
//       service: 'Gmail',
//       auth: {
//         user: 'phoebusapollotest@gmail.com',
//         pass: 'ctecjgtygzkypjbr'
//       }
//     },
//     verifyMailOptions: {
//       from: 'Do Not Reply <phoebusapollotest@gmail.com>',
//       subject: 'Confirm your account',
//       html: '<p>Please verify your account within 24 hours by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
//       'paste the following link into your browser:</p><p>${URL}</p>',
//       text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
//     },
//     shouldSendConfirmation: true,
//     confirmMailOptions: {
//       from: 'Do Not Reply <phoebusapollotest@gmail.com>',
//       subject: 'Successfully verified!',
//       html: '<p>Your account has been successfully verified. If you haven\'t already, you may <a href="https://rocky-escarpment-61736.herokuapp.com/api/login">log in here.</a></p>',
//       text: 'Your account has been successfully verified.'
//     },

//     // hashingFunction: null,
//     smtpTransport: nodemailer.createTransport({
//       from: 'phoebusapollotest@gmail.com',
//       options: {
//         host: 'smtp.gmail.com',
//         port: 587,
//         auth: {
//           user: 'phoebusapollotest@gmail.com',
//           pass: 'ctecjgtygzkypjbr'
//         }
//       }
//     })
//   }, function (error, options) {
//   });

//   nev.generateTempUserModel(User, function (err, tempUserModel) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
//   });

// }
////////////////// end nev

require('./routes/userRouter.js')(app, passport);

// API endpoints go here!

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

// app.get('/api/email-verification/:URL', function (req, res) {
//   console.log("Email VERIFICATION route")
//   console.log(req.params)
//   var url = req.params.URL;

//   nev.confirmTempUser(url, function (err, user) {
//     if (user) {
//       nev.sendConfirmationEmail(user.email, function (err, info) {
//         if (err) {
//           return res.status(404).send('ERROR: sending confirmation email FAILED');
//         }
//         res.send('Your email has been confirmed! Thank you! <a href="http://localhost:3000/login">Click here to log in!</a>')
//       });
//     } else {
//       return res.status(404).send('ERROR: confirming temp user FAILED');
//     }
//   });
// });

let server;
function runServer(port = 3001, database = DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database, err => {
      if (err) {
        return reject(err);
      }
      // setUpNev();
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          console.log(`closeServer error, ${err}`);
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };