
import { Thread } from '../Models.js';
import isEmpty from 'is-empty';
import express from 'express';
import { ObjectId } from 'mongodb';
import passport from '../passport.js';
import { getUserIdFromBearerToken } from '../misc.js';

const router = express.Router();


// create new thread
router.post('/newthread', (req, res) => {
    const _members = !isEmpty(req.body.members) ? req.body.members : '';
    console.log(_members);
    const requestID = getUserIdFromBearerToken(req.headers.authorization);
    console.log("requestFrom: " + requestID);

    const newThread = new Thread({
        members: _members,
    });
    newThread.save()
    .then(thread => res.json(thread))
    .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(400).json({ thread: "Invalid member ID" });
        }
        return res.status(500).json({ error: err.message });
      });
    //curl --insecure -XPOST -H "Content-type: application/json" -d '{"members":["6467c5cdfb2d328520a8e3bc","6467c5b5fb2d328520a8e3ba"]}' 'http://localhost:5000/api/threads/newthread'
}
);

//get list of all threads of a user
router.get('/allthreads', (req, res) => {
    const requestID = getUserIdFromBearerToken(req.headers.authorization);
    console.log("requestFrom: " + requestID);
    Thread.aggregate([
      {
        '$match': {
          'members': new ObjectId(requestID)
        }
      }, {
        '$lookup': {
          'from': 'messages', 
          'localField': '_id', 
          'foreignField': 'thread', 
          'as': 'messages'
        }
      }, {
        '$addFields': {
          'lastMessage': {
            '$arrayElemAt': [
              '$messages', -1
            ]
          }
        }
      }, {
        '$lookup': {
          'from': 'users', 
          'localField': 'members', 
          'foreignField': '_id', 
          'as': 'members'
        }
      }, {
        '$project': {
          '_id': 1, 
          'members': {
            '_id': 1, 
            'username': 1
          }, 
          'lastMessage': {
            'from': 1, 
            'message': 1, 
            'date': 1
          }
        }
      }, {
      $sort: {
        "lastMessage.date": -1
      }
    }
    ])
    .then(threads => res.json(threads))
    .catch(err => res.status(400).json({ threads: "No threads found" }));
});




export default router;