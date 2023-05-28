import { User } from '../Models.js';
import isEmpty from 'is-empty';
import express from 'express';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config.js';
import bcrypt from 'bcrypt'

const router = express.Router();


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

    User.findOne({ username: _username })
        .then(user => {
            if (!user) {
                // Handle case where user is not found
                return res.status(404).json({ usernotfound: "User not found" });
            }

            if (bcrypt.compareSync(_password, user.password)) {
                console.log(user);
                const payload = {
                    id: user.id,
                    name: user.username,
                };
                console.log(payload);
                // Sign token
                jwt.sign(
                    payload,
                    jwt_secret,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "bearer " + token,
                            name: user.name,
                            username: user.username,
                            userId: user._id,
                        });
                    }
                );

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

    //pwd hashing
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(_password, salt, (err, hash) => {
            if (err) throw err;

            const newUser = new User({
                username: _username,
                password: hash
            });
            newUser.save()
                .then(user => res.json(user))
                .catch(err => res.status(400).json({ username: "Username already exists" }));
        });
    });
    //curl --insecure -XPOST -H "Content-type: application/json" -d '{"username":"1User","password":"1PW4User"}' 'http://localhost:5000/api/users/register'

});

//get list of all users
router.get('/allusers', (req, res) => {
    User.find().select('username _id') // select only username and id fields
        .then(users => res.json(users))
        .catch(err => res.status(400).json({ users: "No users found" }));
});








/* const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
}
 
curl --insecure -XPOST -H "Content-type: application/json" -d ''{"username":"1User","password":"1PW4User"}'' 'http://localhost:5000/login'
 
 */

export default router;