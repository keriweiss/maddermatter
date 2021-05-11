const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (err) {
    next(err);
  }
});

app.get('/test', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/test.html'));
  } catch (err) {
    next(err);
  }
});

const init = async () => {
  try {
    const PORT = process.env.PORT || 1234;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

init();
