const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var db = require('./api/db.js');
var agent = require('./api/agent.js');
var client = require('./api/client.js');
var admin = require('./api/admin.js');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(bodyParser.json());

app.use(function (req, res, next) { //allow cross origin requests
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	next();
});
app.use(cors());
// Comment Out DB When Deploy
app.use('/db', db);
app.use('/agent', agent);
app.use('/client', client);
app.use('/admin', admin);
app.get(function(req,res,next){
	req.io = io;
	next();
	})
const port = process.env.PORT || 8000;
server.listen(port);

io.on('connection', function(socket){
  console.log('User connected');
	socket.broadcast.emit('broadcastData', { status: true });
	socket.emit('syncServer', { status: true });
  socket.on('syncMerchant', (data) => {
		console.log(data);
		socket.broadcast.emit(data.merchantID, data);
		
  });
});
console.log(`Server started! Port is ${port}`);