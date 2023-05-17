const router = require('express').Router();
//const validator = require('validator');
const isEmpty = require('is-empty');
const User = require('../schemes/User');
const express = require("express");


router.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

router.get('/health', (req, res) => {
    res.send('OK');
    }
);

//return json object with user when correct login
router.post('/login', (req, res) => {
    const _username = !isEmpty(req.body.username) ? req.body.username : '';
    const _password = !isEmpty(req.body.password) ? req.body.password : '';
    console.log(_username);
    console.log(_password);

    User.findOne( {username: _username} )
    .then(user => {
        if (!user) {
            // Handle case where user is not found
            return res.status(404).json({ usernotfound: "User not found" });
          }

        if (user.password === _password)
        {
          console.log(user);
          return res.status(200).json(user);

          //res.send('OK');
            
        } else {
            // Handle case where passwords don't match
            console.log('User not found');
            return res.status(401).json({ passwordincorrect: "Password incorrect" });
          }
      })

});

router.post('/register', (req, res) => {
    const _username = !isEmpty(req.body.username) ? req.body.username : '';
    const _password = !isEmpty(req.body.password) ? req.body.password : '';
    console.log(_username);
    console.log(_password)


    const newUser = new User({
        username: _username,
        password: _password,
    });
    newUser.save();
    //curl --insecure -XPOST -H "Content-type: application/json" -d '{"username":"1User","password":"1PW4User"}' 'http://localhost:5000/api/users/register'

});
/* const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
}

curl --insecure -XPOST -H "Content-type: application/json" -d ''{"username":"1User","password":"1PW4User"}'' 'http://localhost:5000/login'

 */

module.exports = router;