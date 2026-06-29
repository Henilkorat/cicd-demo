const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello From CI/CD Demo App');
});

module.exports = app;