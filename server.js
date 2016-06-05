var express = require('express');
var open = require('open');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var swig = require('swig');
var app = express();
var livereload = require('express-livereload')
var io = require('socket.io')(http);
var activeUser = [];
var userId = 1000;

livereload(app, { watchDir  : __dirname });

app.set('port', process.env.PORT || '3001');

// Register our templating engine
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/');
app.set('view cache', true);

swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.get('/', function (req, res) {
  res.send('index.html');
});

app.get('/api/users', function (req, res) {
  res.json(activeUser);
});

app.post('/api/user/:id', function(req, res){
	var user_id = req.params.id;
	var cords = req.body.cords;

	console.log(user_id);
	console.log(req.body.cords);

	for (var i = 0; i < activeUser.length; i++) {
		if(activeUser[i].userId == user_id){
			activeUser[i].cords = cords;
		}
	}	
	res.json(activeUser);
});

app.put('/api/users', function(req, res){
	var color = req.body.color;
	var userName = req.body.userName;	

	activeUser.push({ userId : userId , 
		color: color, 
		userName : userName, 
		cords : {} });

	userId++;

	res.json(activeUser);
});

 http.createServer(app).listen(app.get('port'), function () {
	 	open('http://localhost:3001/', function (err) {
		  if (err) throw err;

		  console.log("Express server listening on port " + app.get('port'));
		});        
    });