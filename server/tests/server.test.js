const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');

let todos = [{
	_id: new ObjectID(),
	text: "first thing to do"
},{
	_id: new ObjectID(),
	text: "second thing to do"
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos route', () => {
	it('should create a new todo', (done) => {
		let text = "todo testing";

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}, (err) => done(err));
			});
	});

	it('should not create a new todo(invalid text body)', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((err) => done(err));
			});
	});
});

describe('GET /todos route', () => {
	it('should get all the todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id route', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not found', (done) => {
		id = new ObjectID();
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non ObjectID', (done) => {
		id = 123;
		request(app)
			.get(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id route', () => {
	it('should delete todo', (done) => {

		const hexId = todos[0]._id.toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((err) => done(err));
			});
	});

	it('should return 404 if todo not found', (done) => {
		id = new ObjectID();
		request(app)
			.delete(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 for non ObjectID', (done) => {
		id = 123;
		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
});

