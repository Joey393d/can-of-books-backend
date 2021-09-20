const express = require('express');
require('dotenv').config();



const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  
  jwksUri: 'https://dev-txxoephp.us.auth0.com/.well-known/jwks.json',
});

const { promisify } = require('util');

const verify = promisify(jwt.verify);



async function verifyUser(authorization) {
  if (!authorization) return null;
  let token = authorization.split(' ')[1];

  return await verify(token, getKey, {});
}







const mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo is now connected!');
});


mongoose.connect(process.env.MONGODB_URL);


const Book = require('./models/book');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());


app.get('/books', async (req, res) => {
  const location = req.query.location;

  const findQuery = {};
  
  if (location) {
    findQuery.location = location;
  }
  const books = await Book.find(findQuery);

  res.send(books);

  const { authorization } = req.headers;

  
  let user = await verifyUser(authorization);
  if (!user) {
    res.sendStatus(401);
    return;
  }
})

app.post('/books', postBooks);
app.delete('/books/:id', deleteBook)
app.put('/books/:id', putBook)




const PORT = process.env.PORT || 3001;
if (!parseInt(PORT)) throw 'Invalid PORT';





app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));


async function postBooks(req, res) {
  console.log('headers', req.headers);
  console.log('body', req.body);

  try {
    const newBook = await Book.create(req.body);
    res.send(newBook);
  } catch (err) {
    handleError(err, res);
  }
}




async function putBook(req, res) {

  let id = req.params.id;
  let bookUpdate = req.body;

  let options = {
    new: true,
    overwrite: true,
  }

  try {
    let updatedBook = await Book.findByIdAndUpdate(id, bookUpdate, options);
    res.send(updatedBook);
  } catch(err) {
    handleError(err, res);
  }
}



async function deleteBook(req, res) {
  
  let id = req.params.id;
  

  try {
    await Book.findByIdAndDelete(id);
    res.status(204).send();
  }
  catch (err) {
    handleError(err, res);
  }
}

function handleError(err, res) {
  console.error(err);
  res.status(500).send('oops!');
}
