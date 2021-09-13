'use strict';


const express = require('express');
require('dotenv').config();
const cors = require('cors');


const mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo is now connected!');
});


mongoose.connect(process.env.MONGODB_URL);


const Book = require('./models/book');

const app = express();


app.use(cors());


app.get('/books', async (req, res) => {
  const location = req.query.location;

  const findQuery = {};
  
  const books = await Book.find(findQuery);

  res.send(books);

  console.log(books);
})




const PORT = process.env.PORT || 3001;



if (!parseInt(PORT)) throw 'Invalid PORT';


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
