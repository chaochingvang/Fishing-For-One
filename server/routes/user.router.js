const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  console.log(`in /api/user !`);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;

  const queryText = `INSERT INTO "user" (username, password, email)
    VALUES ($1, $2, $3) RETURNING id`;
  
  console.log(req.body);
  
  pool
    .query(queryText, [username, password, email])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log(`LOGGED IN SUCCESS and req.body is`, req.body)
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


router.put(`/changeEmail`, rejectUnauthenticated, (req, res) => {
  console.log(req.user.id);
  console.log(`this is req.body`, req.body.newEmail);
 

  const values = [req.body.newEmail, req.user.id];
  const queryText = `
    UPDATE "user"
    SET "email" = $1
    WHERE "id" = $2;
  `;

  pool
    .query(queryText, values)
    .then((result) => {
      console.log(`successfully updated email address for user ID`, req.user.id);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`ERROR! /api/user/changeEmail failed!`, err);
      res.sendStatus(500);
    })
});

router.put(`/changePassword`, rejectUnauthenticated, (req, res) => {
  console.log(req.user.id);
  console.log(`req.body`, req.body.newPW);
  const password = encryptLib.encryptPassword(req.body.newPW);
  const values = [password, req.user.id];
  const queryText = `
    UPDATE "user"
    set "password" = $1
    WHERE "id" = $2
  `;

  pool
    .query(queryText, values)
    .then((result) => {
      console.log(`successfully changed PW for user ID`, req.user.id);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(`ERROR! /api/user/changePassword failed!`, err);
      res.sendStatus(500);
    })

})


module.exports = router;
