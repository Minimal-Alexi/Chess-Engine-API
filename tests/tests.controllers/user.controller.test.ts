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
        .expect('Content-Type', /application\/json/);
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
    });
  });

afterEach(async () => {
  await pool.query('DELETE FROM users');
});