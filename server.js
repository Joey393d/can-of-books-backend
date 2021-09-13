'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


var db = mongoose.connection;

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

if (!parseInt(PORT)) throw 'Invalid PORT';


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
