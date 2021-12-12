const express = require('express');
const cors = require('cors');
const piexif = require('piexifjs');
const fs = require('fs');
const fsPromises = fs.promises;
const {v4} = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));

app.use(cors());

app.post('/exif/read', (req, res) => {
  const img = req.body?.imgUrl;
  if (!!img && img.includes('image/jpeg')) {
    try {
      const exif = piexif.load(img);
      res.send(exif);
    } catch (e) {
      res.status(400).send({message: e.message});
    }
    return;
  }
  res.status(400).send({message: 'Invalid image'});
});

app.post('/exif/write', async (req, res) => {
  const {imgUrl, exifData, name} = req.body;
  if (!!imgUrl && imgUrl.includes('image/jpeg')) {
    try {
      const newExifBinary = piexif.dump(exifData);
      const imageBinaryWithoutExif = piexif.remove(imgUrl);
      const newBinaryImage = piexif.insert(
          newExifBinary,
          imageBinaryWithoutExif,
      );
      const imgUuid = v4();
      await fsPromises.mkdir(imgUuid);
      const path = `./${imgUuid}/${name}`;
      const base64 = newBinaryImage.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      await fsPromises.writeFile(path, base64, 'base64');
      res.sendFile(path, {root: __dirname}, () =>
        fs.rmdirSync(imgUuid, {recursive: true, force: true}),
      );
    } catch (e) {
      res.status(400).send({message: e.message});
    }
    return;
  }
  res.status(400).send({message: 'Invalid data'});
});

app.get('/test', (req,res) => {
    res.status(200).json("App healthy");
})

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
