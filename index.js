'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const petRouter = require('./routes/petRouter'); //routing coming soon!!
const { catQueue, dogQueue, Queue } = require('./queue');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

// const cats = [{
//   type: 'cat',
//   imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
//   imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
//   name: 'Fluffy',
//   sex: 'Female',
//   age: 2,
//   breed: 'Bengal',
//   story: 'Thrown on the street'
// },
// {
//   type: 'cat',
//   imageURL:'https://pet-uploads.adoptapet.com/1/4/b/59371175.jpg', 
//   imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
//   name: 'Leopold',
//   sex: 'Male',
//   age: 8,
//   breed: 'Maine Coon',
//   story: 'Owner could no longer care for him'
// },
// {
//   type: 'cat',
//   imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
//   imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
//   name: 'Bob',
//   sex: 'Female',
//   age: 2,
//   breed: 'Bengal',
//   story: 'Thrown on the street'
// },
// ];

// const dogs = [{
//   type: 'dog',
//   imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
//   imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
//   name: 'Zeus',
//   sex: 'Male',
//   age: 3,
//   breed: 'Golden Retriever',
//   story: 'Owner Passed away'
// },
// {
//   type: 'dog',
//   imageURL: 'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/German-Shepherd-Dog-2.jpg',
//   imageDescription: 'An energetic pup looking for love and cuddles.',
//   name: 'Gazelle',
//   sex: 'Female',
//   age: 2,
//   breed: 'German Shepherd',
//   story: 'Needed more space and attention'
// },
// {
//   type: 'dog',
//   imageURL: 'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Siberian-Husky-2.jpg',
//   imageDescription: 'A loving girl looking fo her forever home.',
//   name: 'Maggie',
//   sex: 'Female',
//   age: 7,
//   breed: 'Siberian husky',
//   story: 'Found abandoned'
// }
// ];



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

// app.use('/api', petRouter);
app.get('/api/cat', (req, res) => {
  //show the cat that is next in line to be adopted
  return res.json(catQueue.peek());
});

app.get('/api/dog', (req, res) => {
  //Show the dog that is next in line to be adopted
  return res.json(dogQueue.peek());
});

app.delete('/api/cat', (req, res) => {
  // cats.splice(0,1);
  res.json(catQueue.dequeue());
  console.log('cat adopted!');
  res.status(204);
});

app.delete('/api/dog', (req, res) => {
  res.json(dogQueue.dequeue());
  // res.json(dogs[0]);
  console.log('dog adopted!');
  res.status(204);
});

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
