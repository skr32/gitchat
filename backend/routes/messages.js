//implement the routes for the messages

import { Message } from '../Models.js';
import isEmpty from 'is-empty';
import express from 'express';
import { get } from 'http';
import { getUserIdFromBearerToken, getUsernameFromBearerToken } from '../misc.js';
import mongoose from 'mongoose';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

router.get('/health', (req, res) => {
    res.send('OK');
    }
);

//paste new message in thread
router.post('/newmessage', (req, res) => {
    const _thread = !isEmpty(req.body.thread) ? req.body.thread : '';
    //const _from = !isEmpty(req.body.from) ? req.body.from : '';
    const _from = getUserIdFromBearerToken(req.headers.authorization);
    const _message = !isEmpty(req.body.message) ? req.body.message : '';
    console.log(_thread);
    console.log(_from);
    console.log(_message);

    if(_thread === '' || _from === '' || _message === '') {
        return res.status(400).json({ thread: "Invalid message" });
    };

    const newMessage = new Message({
        thread: _thread,
        from: _from,
        message: _message,
    });
    newMessage.save()
    .then(message => res.json(message))
    //.then(message => res.json(message))
    .catch(err => {
        console.log(err);
        res.status(400).json({ thread: "Message not saved" })
    });
    
    //emit the message to the thread. this saves a db call to get the username
    const messageWithUsername = {
        ...newMessage.toObject(),
        fromUsername: getUsernameFromBearerToken(req.headers.authorization),
    };
    console.log (messageWithUsername);
    req.io.to(_thread).emit("newMessage", messageWithUsername);
    console.log("emitted in thread: " + _thread);

}
);

//get list of all messages in a thread
router.get('/allmessages', (req, res) => {
    const _thread = !isEmpty(req.query.thread) ? req.query.thread : '';
    console.log(_thread);
  /*   Message.find({thread: _thread}).select('_id thread from message') // select only username and id fields
        .populate('from', 'username')
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json({ messages: "Error fetching messages" })); */
    Message.aggregate([
        {
          '$match': {
            'thread': new ObjectId( _thread )
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'from', 
            'foreignField': '_id', 
            'as': 'fromObj'
          }
        }, {
          '$project': {
            '_id': 1, 
            'thread': 1, 
            'message': 1, 
            'date': 1, 
            'fromUsername': '$fromObj.username'
          }
        }, {
          '$unwind': '$fromUsername'
        }
      ])
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json({ messages: "Error fetching messages" }));
});

//get last - (n*10) messages in a thread 
router.get('/lazyload', (req, res) => {
    const _index = parseInt(!isEmpty(req.body.index) ? req.body.index : 0);
    const _thread = !isEmpty(req.body.thread) ? req.body.thread : '';

    Message.find({thread: _thread}).sort({createdAt: -1}).skip(_index*10).limit(10).select('_id thread from message') // select only username and id fields
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json({ messages: "Error fetching messages" }));
}); 





export default router;