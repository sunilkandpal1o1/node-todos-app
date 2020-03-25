const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(Process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};