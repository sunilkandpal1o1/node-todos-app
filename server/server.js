const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
	const newTodo = new Todo({
		text: req.body.text,
	});

	newTodo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	let id = req.params.id;

	// res.send(req.params.id);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if(!todo) {
			res.status(404).send();
		}

		res.send({todo});
	}, (err) => {
		res.status(400).send(err);
	});

})

app.listen(port, () => {
	console.log(`Server started at ${port}`);
});

// const newTodo = new Todo({
// 	text: ' jhg '
// });

// newTodo.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
// 	console.log('Unable to save todo', err);
// });



// const newUser = new User({
// 	email: "pafdj@fj.com"
// });

// newUser.save().then((doc) => {
// 	console.log('user saved', doc._doc);
// }, (err) => {
// 	console.log('Unable to save user', err);
// });

module.exports = {app};