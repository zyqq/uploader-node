const express = require('express');
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.get('/', (req, res) => {
  res.send('hello nodejs');
});

app.options('/upload', cors());
app.post('/upload', cors(), upload.single('file'), (req, res) => {
  let filename = req.file.filename;
  let object = { id: filename }
  res.send(JSON.stringify(object));
});

app.get('/preview/:key', cors(), (req, res) => {
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    },
    (error) => {
      console.log('error', error);
    }
  );
});

var port = process.env.PORT || 3000;
console.log(port);
app.listen(port);
