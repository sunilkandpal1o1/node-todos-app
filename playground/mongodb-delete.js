const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to mongodb server');
	}

	console.log('Connected to database');

	//deleteMany
	// db.collection('Users').deleteMany({ name: "Anie"}).then( (results) => {
	// 	console.log(results);
	// });

	//deleteOne
	// db.collection('Users').deleteOne({ name: "Anie"}).then((results) => {
	// 	console.log(results);
	// });

	//findOneAndDelete
	db.collection('Users').findOneAndDelete({ _id: new ObjectID("5e64f4d776384416a28f5790")}).then((result) => {
		console.log(result);
	});

	// db.close();
});