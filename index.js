const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

express()
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`server is listening on port ${PORT}`));
