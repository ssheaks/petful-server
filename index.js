'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const petRouter = require('./routes/petRouter');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.get('/api/cat', (req, res) => {
  //show the cat that is next in line to be adopted
  return res.json(//return a cat
  );});

app.get('/api/dog', (req, res) => {
  //Show the dog that is next in line to be adopted
  return res.json(//return a dog
  );});

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api', petRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect(); //not using a db
  runServer();
}

module.exports = { app };
