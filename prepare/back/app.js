const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path')
const morgan = require('morgan');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');
const passport = require('passport');
dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();
app.use(morgan('dev'))
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('nodebirdseceret'));
app.use(session({
  saveUninitialized:false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts',postsRouter);
app.use('/post',postRouter);
app.use('/user',userRouter);

app.listen(3065, ()=>{
  console.log('서버 실행')
});