const mongoose = require('mongoose');
// const MONGODB_URI = 'mongodb://admin:h3fay5XTYmaR8PS@cluster0-shard-00-00-ofbrv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};