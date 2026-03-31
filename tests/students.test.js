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
      name: 'Alice', email: 'alice@example.com', course: 'Computing'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice');
    createdId = res.body.id;
  });

  test('POST /api/students - fails with missing fields', async () => {
    const res = await request(app).post('/api/students').send({ name: 'Bob' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/students/:id - returns student', async () => {
    const res = await request(app).get(`/api/students/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  test('PUT /api/students/:id - updates student', async () => {
    const res = await request(app).put(`/api/students/${createdId}`).send({
      name: 'Alice Updated', email: 'alice@example.com', course: 'Computing'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alice Updated');
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