const request = require('supertest');
const app = require('../server');

describe('Student API', () => {
  let createdId;

  test('GET /api/students - returns empty array initially', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/students - creates a student', async () => {
    const res = await request(app).post('/api/students').send({
      name: 'Alice Smith', email: 'alice@example.com', course: 'Computing'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice Smith');
    createdId = res.body.id;
  });

  test('POST /api/students - fails with missing fields', async () => {
    const res = await request(app).post('/api/students').send({ name: 'Bob' });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/students - fails with invalid email', async () => {
    const res = await request(app).post('/api/students').send({
      name: 'Bob', email: 'notanemail', course: 'Computing'
    });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/students/:id - returns student', async () => {
    const res = await request(app).get(`/api/students/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  test('GET /api/students/:id - returns 404 for non existent id', async () => {
    const res = await request(app).get('/api/students/9999');
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/students/:id - updates student', async () => {
    const res = await request(app).put(`/api/students/${createdId}`).send({
      name: 'Alice Updated', email: 'alice@example.com', course: 'Computing'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alice Updated');
  });

  test('PUT /api/students/:id - returns 404 for non existent id', async () => {
    const res = await request(app).put('/api/students/9999').send({
      name: 'Test', email: 'test@test.com', course: 'Computing'
    });
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/students/search - finds student by name', async () => {
    const res = await request(app).get('/api/students/search?q=Alice');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/students/search - returns 400 without query', async () => {
    const res = await request(app).get('/api/students/search');
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /api/students/:id - deletes student', async () => {
    const res = await request(app).delete(`/api/students/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  test('GET /api/students/:id - returns 404 after delete', async () => {
    const res = await request(app).get(`/api/students/${createdId}`);
    expect(res.statusCode).toBe(404);
  });
});