import request from 'supertest';
import app from '../server.js';

describe('GET /', () => {
  it('responds with "Hello World!"', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.text).toEqual('Hello World!');
  });
});

describe('GET /health', () => {
  it('responds with "OK"', async () => {
    const res = await request(app).get('/api/users/health');
    expect(res.status).toBe(200);
    expect(res.text).toEqual('OK');
  });
});

describe('POST /login', () => {
  it('responds with user object and status 200 when given correct login credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testUser', password: 'testPassword' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'testUser');
    expect(res.body).toHaveProperty('password', 'testPassword');
  });

  it('responds with error message and status 404 when given incorrect username', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'wrongUser', password: 'testPassword' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('usernotfound', 'User not found');
  });

  it('responds with error message and status 401 when given incorrect password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'testUser', password: 'wrongPassword' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('passwordincorrect', 'Password incorrect');
  });
});

describe('POST /register', () => {
  it('responds with user object and status 200 when given valid registration data', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'newUser', password: 'newPassword' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('username', 'newUser');
    expect(res.body).toHaveProperty('password', 'newPassword');
  });
});
