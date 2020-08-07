const express = require('express');
const open = require('open');

const app = express();
const port = 3000;

app.use(express.static('examples/browser'));

app.get('/', (req, res) => {
  res.send('Genetic Algorithm Examples');
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, async () => {
  console.log(`Server listening on port ${port}!`);
  await open(`http://localhost:${port}`);
});
