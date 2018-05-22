const express = require('express');

const app = express();

const PORT = process.env.PORT || 4001;

const db = {
  "items":
  [
    {
      "description":"Sony A6300",
      "availability":true
    },
    {
      "description":"Nikon D3300",
      "availability":true
    }
  ]};

  //GET All
  app.get('/', (req, res, next) => {

    res.json(db);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
