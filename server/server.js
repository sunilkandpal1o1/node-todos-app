const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');


const app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
	const newTodo = new Todo({
		text: req.body.text,
	});

	newTodo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.send(err);
	});
});

app.listen('3000', () => {
	console.log('Server started on port 3000');
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