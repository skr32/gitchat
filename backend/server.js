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

//output all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  console.log();
  next();
});

import { verifyUser } from './misc.js';
function isAuthenticated(req, res, next) {
  // Check if user is authenticated
  if (!verifyUser(req.headers.authorization) && req.url != '/login' && req.url != '/api/users/login') {
    res.redirect('/login');
  }
  return next();
}

app.use(function (req, res, next) {
	req.io = io;
	next();
});

io.on('connection', socket => {
  console.log(socket.rooms)
  socket.on('subscribe',function(room){  
    try{
      console.log('[socket]','join room :',room)
      socket.join(room);
      socket.to(room).emit('user joined', socket.id);
    }catch(e){
      console.log('[error]','join room :',e);
    }
  })
  socket.on('unsubscribe',function(room){
    try{
      console.log('[socket]','leave room :',room)
      socket.leave(room);
      socket.to(room).emit('user left', socket.id);
    }catch(e){
      console.log('[error]','leave room :',e);
    }
  })
  socket.on('unsubscribeAll',function(){
    try{
      console.log('[socket]','leave all rooms')
      socket.leaveAll();
      socket.to(room).emit('user left', socket.id);
    }catch(e){
      console.log('[error]','leave all rooms :',e);
    }
  })
});

//app.use(isAuthenticated);

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
import { verify } from 'crypto';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/test1', function(req, res){
  res.sendFile(__dirname + '/static/test1.html');
});
app.get('/test2', function(req, res){
  res.sendFile(__dirname + '/static/test2.html');
});
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/static/login.html');
});
app.get('/chats', function(req, res){
  res.sendFile(__dirname + '/static/chats.html');
});
app.get('/', function(req, res){
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

