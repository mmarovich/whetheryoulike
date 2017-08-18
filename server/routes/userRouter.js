const User = require('./models/user');
const TempUser = require('./models/tempUserModel')
const mongoose = require('mongoose')

module.exports = function (app, passport, nev) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/api', function (req, res, next) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send() // load the index.ejs file
    });


    app.get('/api/email-verification/:URL', function (req, res) {
        console.log("Email VERIFICATION route")
        console.log(req.params)
        var url = req.params.URL;

        nev.confirmTempUser(url, function (err, user) {
            if (user) {
                nev.sendConfirmationEmail(user.email, function (err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending confirmation email FAILED');
                    }
                    res.send('Your email has been confirmed! Thank you! <a href="http://localhost:3000/login">Click here to log in!</a>')
                });
            } else {
                return res.status(404).send('ERROR: confirming temp user FAILED');
            }
        });
    });

    // app.post('/api/signup', function (req, res) {
    //     const username = req.body.username
    //     const email = req.body.email;
    //     const pw = req.body.password;
    //     const newUser = new User({
    //         username: username,
    //         email: email,
    //         password: pw
    //     });

    //     nev.createTempUser(newUser, (err, existingPersistentUser, newTempUser) => {

    //         if (err) {
    //             return res.status(404).send(`ERROR: creating temp user FAILED ${err}`);
    //         }

    //         if (existingPersistentUser) {
    //             return res.json({
    //                 msg: `You have already signed up and confirmed your account. Did you forget your password?`
    //             });
    //         }

    //         if (newTempUser) {
    //             var URL = newTempUser[nev.options.URLFieldName];

    //             nev.sendVerificationEmail(email, URL, function (err, info) {
    //                 console.log(info)
    //                 if (err) {
    //                     console.error(err);
    //                     return res.status(500).send(`ERROR: sending verification email FAILED ${err}`);
    //                 }
    //                 res.json({
    //                     email: info.accepted[0],
    //                     status: 'uncomfirmed'
    //                 });
    //             });

    //         } else {
    //             res.json({
    //                 msg: 'You have already signed up. Please check your email to verify your account.'
    //             });
    //         }
    //     })
    // })

    app.post('/api/signup', (req, res, next) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                return res.send(err)
            }
            if (user) {
                return res.send({ msg: 'User already exists' })
            }
            if (!user) {
                let newUser = new User()
                newUser.email = req.body.email
                newUser.password = newUser.generateHash(req.body.password)

                newUser.save((err, user) => {
                    if (err) {
                        res.send(err)
                    }
                    res.status(200).json(user)
                })
            }

        })
    })



    app.post('/api/login', (req, res, next) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                return res.send(err)
            }
            if (!user) {
                return res.sendStatus(404)
            }
            if (!user.validPassword(req.body.password)) {
                return res.sendStatus(403)
            }

            res.status(201).json(user)
        })
    });

    app.post('/api/saveSettings', function (req, res, next) {
        User.find({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                res.status(400).send(err)
            } else {
                console.log(user)
                user[0].settings = req.body.settings

                user[0].save((err, user) => {
                    if (err) {
                        throw err
                    }
                    res.status(200).json(user);
                })
            }
        })
    })


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function (req, res, next) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}