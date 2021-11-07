const express = require('express');
const cors = require('cors');
const piexif = require('piexifjs');

const app = express();
const port = 3000;

app.use(express.json())

app.use(cors());

app.post('/getExif', (req, res) => {
  const img = req.body?.imgUrl;
  if (!!img /* && validate image */) {
    const exif = piexif.load(img);
    res.send(exif);
    return;
  } 
  res.status(400).send('Invalid image');
});

app.listen(port, () => {
  console.log(`Exif editor api started at http://localhost:${port}`);
});