import bcrypt from 'bcrypt';
import { NR_OF_SALTING_ROUNDS } from "../../src/config/constants";
import app from '../../src/app';
import supertest from 'supertest';

const api = supertest(app);

jest.mock('../../src/config/database', () => {
  const { createTestDb } = require('../createTestDb');
  const { pool } = createTestDb();
  return {
    pool,
    connectDB: jest.fn(),
  };
});

const pool = require('../../src/config/database').pool;

beforeEach(async () => {
  await pool.query(`
    INSERT INTO users (username, email, password)
    VALUES
      ('test1', 'test1@example.com', '${bcrypt.hashSync('password1', NR_OF_SALTING_ROUNDS).toString()}'),
      ('test2', 'test2@example.com', '${bcrypt.hashSync('password2', NR_OF_SALTING_ROUNDS).toString()}');
  `);
});

describe('User Controller', () => {
  describe('Authentication handling', () => {
    describe('User Registration', () => {
      it('Should register a new user', async () => {
        const user = {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'newpassword'
        };
        await api
          .post('/api/v1/users/register')
          .send(user)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .expect(res => {
            expect(res.body.user).toHaveProperty('session_id');
            expect(res.body.user).toHaveProperty('username', user.username);
            expect(res.body.user).toHaveProperty('email', user.email);
            expect(res.body.user).not.toHaveProperty('password');
          });
      });
      it('Should not register a user with existing email', async () => {
        const user = {
          username: 'test1',
          email: 'test1@example.com',
          password: 'password1'
        };
        await api
          .post('/api/v1/users/register')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      }
      );
      it("Should salt the passwords", async () => {
        const user = {
          username: 'salteduser',
          email: 'saltedemail@example.com',
          password: 'saltedpassword'
        };
        await api
          .post('/api/v1/users/register')
          .send(user)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const result = await pool.query('SELECT password FROM users WHERE email = $1', [user.email]);
        const storedPassword = result.rows[0].password;
        expect(storedPassword).not.toBe(user.password);
        expect(bcrypt.compareSync(user.password, storedPassword)).toBe(true);
      });
      it("Should check registration fields.", async () => {
        const user = {
          username: 'salteduser',
          email: null,
          password: null
        };
        await api
          .post('/api/v1/users/register')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      });
      it("Should check if the email is valid.", async () => {

        const user = {
          username: 'validuser',
          email: 'invalid-email',
          password: 'validpassword'
        };
        await api
          .post('/api/v1/users/register')
          .send(user)
          .expect(400)
          .expect('Content-Type', /application\/json/);
      });
    });
    describe('User Login', () => {
      it('Should login an existing user', async () => {
        const credentials = {
          email: 'test1@example.com',
          password: 'password1'
        };
        await api
          .post('/api/v1/users/login')
          .send(credentials)
          .expect(200)
          .expect('Content-Type', /application\/json/);
      });
      it('Should not login with wrong credentials', async () => {
        const credentials = {
          email: 'test1@example.com',
          password: 'badpassword'
        };
        await api
          .post('/api/v1/users/login')
          .send(credentials)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      });
    });
  });
});

afterEach(async () => {
  await pool.query('DELETE FROM users');
});
