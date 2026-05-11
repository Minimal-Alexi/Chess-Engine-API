import app from '../../src/app';
import supertest from 'supertest';
import { createFenString } from '../../src/utils/boardMapUtils';

const api = supertest(app);

jest.mock('../../src/config/database', () => {
  const { createTestDb } = require('../createTestDb');
  const { pool } = createTestDb();
  return {
    pool,
    connectDB: jest.fn(),
  };
});

jest.mock('../../src/utils/createToken', () => {
  return jest.fn((id) => `mock-token-${id}`);
});


const pool = require('../../src/config/database').pool;

beforeEach(async () => {
    await pool.query(`
    INSERT INTO users (username, email, password)
    VALUES
      ('test1', 'test1@example.com', 'banana'),
      ('test2', 'test2@example.com', 'banana2');
      ('newtestguy','testguy@example.com', 'banana3')
    `);
    // First game is a check game, second is a mate game.
    const checkGame = [
        ['k', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'B', ' ', ' ', ' ', ' ', ' '],
        ['n', ' ', ' ', ' ', ' ', ' ', ' ', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ];
    const mateGame = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', ' ', 'p', 'p', 'p'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', 'p', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', 'P', ' '],
            [' ', ' ', ' ', ' ', ' ', 'P', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', ' ', ' ', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
    await pool.query(`
    INSERT INTO game (game_id, turn_counter, game_state)
    VALUES
        (1, 1,'${createFenString(checkGame)}')
        (2, 1,'${createFenString(mateGame)}')
    `);
    await pool.query(`
    INSERT INTO players (game_id, user_id, team)
    VALUES
        (1,1,'white')
        (1,2,'black')
        (2,2,'white')
        (2,1,'black')
      `)
});

afterEach(async () => {
  await pool.query('DELETE FROM users,game,players')
})