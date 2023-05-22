import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;
const db = "mongodb://127.0.0.1:27017/ChatApp"

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});


app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));

import bodyParser from 'body-parser';
app.use('/static', express.static('node_modules'));

import passport from './passport.js';
app.use(passport.initialize());
//app.use(passport.session());


app.use(bodyParser.json());

app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
app.get('/profile2', function(req, res) {
  //request header to string
  console.log(JSON.stringify(req.headers));

});


import miscRoute from './routes/misc.js';
import userRoute from './routes/users.js';
import threadRoute from './routes/threads.js';
import messageRoute from './routes/messages.js';

app.use("/api/misc", miscRoute);
app.use("/api/users", userRoute);
app.use("/api/threads", threadRoute);
app.use("/api/messages", messageRoute);

//fancy way of getting the current directory name in ES6
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/test1', function(req, res){
  res.sendFile(__dirname + '/static/test1.html');
});
app.get('/test2', function(req, res){
  res.sendFile(__dirname + '/static/test2.html');
});
  

export default app;

mongoose
    .connect(db)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


    io.sockets.on('connection', (socket) => {
        console.log('a user connected');
        
    });

