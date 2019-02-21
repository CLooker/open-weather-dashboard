if (!process.env.NODE_ENV) require('dotenv').config();
const express = require('express');
const path = require('path');

const api = require('./api');
const PORT = process.env.PORT || 8080;

express()
  .use('/api', api)
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`server is listening on port ${PORT}`));
