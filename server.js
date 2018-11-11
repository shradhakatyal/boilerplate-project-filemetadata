'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  var outputObject = {name: req.file.originalname, type: req.file.mimetype, size: req.file.size};
  res.send(outputObject);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is running on - '+(process.env.PORT || 3000));
});
