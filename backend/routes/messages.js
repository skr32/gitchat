//implement the routes for the messages

import { Message } from '../Models.js';
import isEmpty from 'is-empty';
import express from 'express';
import { get } from 'http';
import { getUserIdFromBearerToken } from '../misc.js';

const router = express.Router();

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
    //curl --insecure -XPOST -H "Content-type: application/json" -d '{"thread":"6467c5e5098d39c3c9c3feda","from":"6467c5cdfb2d328520a8e3bc","message":"Hello"}' 'http://localhost:5000/api/messages/newmessage'

    //req.io.sockets.emit("newMessage", req.body);
    
    //req.io.to("tet").emit("newMessage", req.body);
    //req.io.emit("newMessage", req.body);
    req.io.to(_thread).emit("newMessage", newMessage);
    console.log("emitted in thread: " + _thread);

}
);


export default router;