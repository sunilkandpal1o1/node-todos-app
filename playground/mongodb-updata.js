const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
	if(err) {
		return console.log('Unable to connect to mongodb server');
	}

	console.log('Connected to database');

	db.collection('Users').findOneAndUpdate(
		{
			_id: new ObjectID("5e64f5c5ab2f3116fa828be8")
		},{
			$set: {
				name: "sunil"
			},
			$inc: {
				age: 1
			}
		},{
			returnOriginal: false
		}).then((result) => {
			console.log(result);
		});

	// db.close();
});