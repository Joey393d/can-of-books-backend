const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Book = require('./models/book');




async function seed() {

  const myBook = new Book({
  name: 'Kingdoms of Ruin',
  description: 'A manga about a wizard destroying a kingdom in revenge',
  status: 'Completed',
  email: 'joeyyoung97@gmail.com',
})
myBook.save();


const theBook = new Book({
  name: 'The Book',
  description: 'The book as object, as content, as idea, as interface.',
  status: 'Completed',
  email: 'joeyyoung97@gmail.com',
})
theBook.save();



const mostlyDead = new Book({
  name: 'Mostly Dead Things',
  description: 'What does it take to come back to life? For Jessa-Lynn Morton, the question is not an abstract one. In the wake of her father’s suicide, Jessa has stepped up to manage his failing taxidermy business while the rest of the Morton family crumbles.',
  status: 'Completed',
  email: 'joeyyoung97@gmail.com',
})
mostlyDead.save();

  mongoose.disconnect();


}


seed();