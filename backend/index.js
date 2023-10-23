const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const friendRoute = require('./routes/friendRoute');
const postRoute = require('./routes/postRoute');
const cateRoute = require('./routes/cateRoute');
const auth = require('./Middleware/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.static(path.join(__dirname, './uploads')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let OnlineUser = [];

const addNewUser = (username, socketId) => {
  !OnlineUser.some((user) => user.username === username) &&
    OnlineUser.push({ username, socketId });
};

const getUser = (username) => {
  return OnlineUser.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    console.log(user + ': has connected');
    addNewUser(user, socket.id);
    // console.log(user);
  });
  socket.on(
    'addUnFriend',
    ({ senderName, receiverName, message, senderProfile, date }) => {
      const sender = getUser(senderName);
      const receiver = getUser(receiverName);
      console.log(sender);
      console.log(receiver);
      if (receiver) {
        io.to(receiver.socketId).emit('addUnFriend', {
          senderName,
          message,
          senderProfile,
          date,
        });
      }
      // io.emit('addUnFriend', {
      //   username,
      //   message,
      //   profilePicture,
      //   date,
      // });
      console.log({
        senderName,
        message,
        senderProfile,
        date,
      });
    }
  );

  socket.on('disconnect', (user) => {
    OnlineUser = OnlineUser.filter((user) => user.socketId !== socket.id);
    console.log(user + ' user has left');
  });
});
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful!'))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use('/api/auth', authRoute);
app.use('/api/users', auth, userRoute);
app.use('/api/friend', auth, friendRoute);
app.use('/api/post', auth, postRoute);
app.use('/api/cates', auth, cateRoute);
