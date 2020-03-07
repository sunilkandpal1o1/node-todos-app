const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to mongodb server');
	}

	console.log('Connected to database');

	db.collection('Todos').find({ _id: new ObjectID('5e636ba24d8a921259ff0152')}).toArray().then( (docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	// db.collection('Todos').insertOne({
	// 	text: 'Talk to her',
	// 	completed: false
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert item.', err);
	// 	}

	// 	//console.log(JSON.stringify(result.ops, undefined, 2));
	// 	console.log(result.ops);
	// });

	// db.collection('Users').insertOne({
	// 	name: 'summer',
	// 	age: 20,
	// 	location: 'callifornia'
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert User', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 1));
	// });

	// //closing db connection
	// db.close();
});