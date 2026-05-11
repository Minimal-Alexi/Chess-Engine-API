import app from '../../src/app';
import supertest from 'supertest';
import { createFenString } from '../../src/utils/boardMapUtils';
import createToken from '../../src/utils/createToken';

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
  INSERT INTO users (user_id, username, email, password)
  VALUES
    (1, 'test1', 'test1@example.com', 'banana'),
    (2, 'test2', 'test2@example.com', 'banana2'),
    (3, 'newtestguy', 'testguy@example.com', 'banana3');
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
    INSERT INTO games (game_id, turn_counter, game_state)
    VALUES
        (1, 1,'${createFenString(checkGame)}'),
        (2, 1,'${createFenString(mateGame)}');
    `);
  await pool.query(`
    INSERT INTO players (game_id, user_id, team)
    VALUES
        (1,1,'white'),
        (1,2,'black'),
        (2,2,'white'),
        (2,1,'black');
      `)
});

describe('Game Controller', () => {
  it("Should expect authorization.", async () => {
    await api.post('/api/v1/games/1')
      .expect(401)

    await api.post('/api/v1/games/1')
      .set("Authorization", 'Bearer LIAR')
      .expect(401)
  })

  describe('Game Creation', () => {
    it("Should create a glorious game between two opponents", async () => {
      const userId = 1
      const opponentId = 3
      await api.post('/api/v1/games/createGame/' + opponentId)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(201)
        .expect(res => {
          // Person that creates the game is white.
          res.body.message.toBe("Game has been created, you may start!")
          res.body.game.toHaveProperty('turnCounter', 0);
          res.body.game.state.toHaveProperty('fen', "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
          res.body.players.toHaveProperty('white', userId)
          res.body.players.toHaveProperty('black', opponentId)
        });
    })
    it("Should not create a game if a user doesn't exist.", async () => {
      const userId = 1
      const opponentId = 4
      await api.post('/api/v1/games/createGame/' + opponentId)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(404);
    })
  })
})

afterEach(async () => {
  await pool.query('DELETE FROM players;');
  await pool.query('DELETE FROM games;');
  await pool.query('DELETE FROM users;');
});