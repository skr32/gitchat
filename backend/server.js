const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const db = "mongodb://127.0.0.1:27017/ChatApp"


const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        }
    });
app.use(cors());
server.listen(port, () => console.log(`Listening on port ${port}`));

const bodyParser = require("body-parser");
app.use('/static', express.static('node_modules'));


app.use(bodyParser.json());
app.use("/api/misc", require("./routes/misc"));
app.use("/api/users", require("./routes/users"));

const mongoose = require('mongoose');
mongoose
    .connect(db, {
        useNewUrlParser:true,
        useUnifiedTopology: true
   })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


    io.sockets.on('connection', (socket) => {
        console.log('a user connected');
        
    });