var express = require('express');
var multer  =   require('multer');
var path = require('path');
var fs = require('fs');  

var app = express();
var router = express.Router();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + '/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage }).array('userPhoto',5);


app.set('views', __dirname + '/views');
app.get('/index', function(req, res){
  res.render('indexss.ejs');
});

app.use('/', router);

app.post('/api/photo', function(req, res){
    upload(req, res, function(err) {
         if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

router.get('/download', function(req, res) { 
  var dir = path.resolve(".") + '/uploads/';
  fs.readdir(dir, function(err, list) { 
    if (err) 
      return res.json(err);
    else
      res.json(list);
  });

});

router.get('/download/:file(*)', function(req, res, next){ 
  var file = req.params.file;
  var path = require('path');
  var path = path.resolve(".") + '/uploads/' + file;
  res.download(path, file, function(err){
    if (err){
      console.log(err);
    } else {
      console.log('downloading successful');
    }
  });
});


app.listen(8080);
