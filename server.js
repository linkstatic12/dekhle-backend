// Server Dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const morgan = require('morgan');
const winston = require('./config/winston');
const helmet = require('helmet');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const pinecone = require('@pinecone-database/pinecone')
// Init Express
const app = express();
require('dotenv').config({ path: './config/config.env' });
require('./config/passport')(passport)
// DB Connection
mongoose.Promise = global.Promise;

global.client = new pinecone.PineconeClient();
client.init({
  apiKey: '47dc1ecd-bf43-45e5-ad70-10ba7f8cc313',
  environment:'us-west4-gcp-free',
});

let dev = process.env.DEV;
mongoose.connect(
  dev
    ? process.env.MONGO_URI
    : process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (e) => {
    if (e) {
      const dbError = {
        error: e,
        msg: 'Error Connecting to Database. Please check MongoDB is running',
      };
      console.log(dbError);
    } else {
      console.log(`Connected to ${dev ? 'Development' : 'Prod'} Database`);
    }
  }
);

// Server Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));
app.use(helmet());

// Cors Controls
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Routes Definitions
const adminRoutes = require('./api/routes/adminRoutes');
const authRoutes = require('./api/routes/authRoutes');
const taskRoutes = require('./api/routes/todoListRoutes');
const sitemapRoutes = require('./api/routes/sitemap');
const uploadRouters = require('./api/routes/uploadRoutes');
const chatRoutes= require('./api/routes/chatRoutes');
const midProcessedVariablesRoutes = require('./api/routes/midProcessedVariablesRoutes')
chatRoutes(app);
adminRoutes(app);
taskRoutes(app);
sitemapRoutes(app);
uploadRouters(app);
authRoutes(app);
midProcessedVariablesRoutes(app);
// 404 Handling

app.use((req, res) => {
  winston.error(`'Hit 404' - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
console.log(process.env.MONGO_URI);
let store = new MongoStore({
  mongoUrl: process.env.MONGO_URI,
  collection: "sessions",
  mongooseConnection: mongoose.connection
});

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
)

app.use(passport.initialize())
app.use(passport.session())


// Server Port Controls
const port = process.env.PORT || '5000';
app.set('port', port);


// Passport middleware

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
