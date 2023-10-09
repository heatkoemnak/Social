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

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful!'))
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/auth', authRoute);
app.use('/api/users', auth, userRoute);
app.use('/api/friend', friendRoute);
app.use('/api/post', auth, postRoute);
app.use('/api/cates', auth, cateRoute);
