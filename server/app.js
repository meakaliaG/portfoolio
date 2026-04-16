require('dotenv').config();

const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
const router = require('./router.js');

const port = process.env.PORT || 3000;

// MongoDB connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/mgPortfolio';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log('Could not connect to database');
    console.error(err);
  });

// Create app immediately (no blocking async stuff)
const app = express();

// Middleware
app.use(helmet());
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));
// app.use(favicon(`${__dirname}/../hosted/img/favicon.png`)); // optional
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session (no Redis — uses memory store)
app.use(session({
  key: 'sessionid',
  secret: process.env.SESSION_SECRET || 'devSecret123', // better than hardcoding
  resave: false,
  saveUninitialized: false,
}));

// View engine
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

console.log(`dirname: ${__dirname}`);

// Routes
router(app);

// Start server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${port}`);
});