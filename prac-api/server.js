var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var Project = require('./project-model');

//setup database connection
var connectionString = 'mongodb://adminSam:admin123@brainstormusers-shard-00-00-qol9b.gcp.mongodb.net:27017,brainstormusers-shard-00-01-qol9b.gcp.mongodb.net:27017,brainstormusers-shard-00-02-qol9b.gcp.mongodb.net:27017/test?ssl=true&replicaSet=brainstormUsers-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString,{ useNewUrlParser: true });
var  db = mongoose.connection;
db.once('open', () => console.log('Database connected'));
db.on('error', () => console.log('Database error'));

//setup express server
var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'));

//setup routes
var router = express.Router();

router.get('/users', (req, res) => {
  res.send('<h1>Testing is working</h1>')
})

router.get('/users', (req, res) => {

	Project.find()
	.then((users) => {
	    return res.json(users);
	});

})

router.get('/users/:id', (req, res) => {

	Project.findOne({id:req.params.id})
	.then((users) => {
	    return res.json(users);
	});
})

router.post('/users', (req, res) => {

	var users = new Project();
	users.id = Date.now();
	
	var data = req.body;
	Object.assign(users,data);
	
	users.save()
	.then((users) => {
	  	return res.json(users);
	});
});

router.delete('/users/:id', (req, res) => {

	Project.deleteOne({ id: req.params.id })
	.then(() => {
		return res.json('deleted');
	});
});

router.put('/users/:id', (req, res) => {

	users.findOne({id:req.params.id})
	.then((users) => {
		var data = req.body;
		Object.assign(users,data);
		return users.save()	
	})
	.then((users) => {
		return res.json(users);
	});	

});

app.use('/api', router);

// launch our backend into a port
const apiPort = 3003;
app.listen(apiPort, () => console.log('Listening on port '+apiPort));