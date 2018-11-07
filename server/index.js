const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('http-proxy-middleware')
//const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/restaurants/:rest_id', express.static(path.join(__dirname, './../public')));

app.use('/restaurants/:rest_id/gallery', proxy({target: "http://127.0.0.1:3004"}))
app.get('/restaurants/:rest_id/gallery', function(req, res){
	const gallery = path.join(__dirname, "./public/index.html");
	res.sendFile(gallery);
});



app.listen(port, () => {
  console.log(path.join(__dirname, './../public'));
  console.log(`server running at: http://localhost:${port}`);
});