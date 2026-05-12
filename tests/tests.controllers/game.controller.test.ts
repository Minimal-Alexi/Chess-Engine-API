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
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K']
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
  it("Should expect authorization. (401)", async () => {
    await api.post('/api/v1/games/1')
      .expect(401)

    await api.post('/api/v1/games/1')
      .set("Authorization", 'Bearer LIAR')
      .expect(401)
  })

  describe('Game Creation', () => {
    it("Should create a glorious game between two opponents. (201)", async () => {
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
          expect(res.body.players).toEqual({
            white: {
              userId: userId,
              username: "test1",
            },
            black: {
              userId: opponentId,
              username: "newtestguy",
            },
          });
        });
    })
    it("Should not create a game if a user doesn't exist. (404)", async () => {
      const userId = 1
      const opponentId = 4
      await api.post('/api/v1/games/createGame/' + opponentId)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(404);
    })
  })
  describe('Getting game by id', () => {
    it("Should retrieve the game the player requests. (200)", async () => {
      const userId = 1
      await api.get('/api/v1/games/1')
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(200);
    })
    it("Shouldn't return anything if the game doesn't exist. (404)", async () => {
      const userId = 1
      await api.get('/api/v1/games/6')
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(404);
    })
    it("Shouldn't return anything if the player does not participate in the game. (403)",  async () => {
      const userId = 3
      await api.get('/api/v1/games/2')
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(403);
    })
  })
  describe("Get all of the users games", () => {
    it("Should retrieve all the games the player requests. (200)", async () => {
      const userId = 1
      await api.get('/api/v1/games')
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(200);
      
      const secondUserId = 3
      await api.get('/api/v1/games')
        .set("Authorization", 'Bearer ' + createToken(secondUserId))
        .expect(200)
        .expect(res =>
           {
            res.body.message.toBe("No games were found, maybe it's time you found a worth opponent!")
            res.body.toHaveProperty("games", [])
          }
        );
    })
  })
  describe("Get a pieces legal moves", () => {
    it("Should return a map of the available legal moves. (200)", async () => {
      const userId = 1;
      const bishopMap = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      const coords = [0, 5]
      await api.get('/api/v1/games/2/legalMoves')
      .set("Authorization", 'Bearer ' + createToken(userId))
      .send(coords)
      .expect(200)
      .expect(res =>
           {
            res.body.toHaveProperty("moves", bishopMap)
          }
        );
    })
    it("Should be check aware. (200)", async () => {
      const userId = 2;
      const kingMoves = [
        [0, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      const coords = [0, 0]
      await api.get('/api/v1/games/1/legalMoves')
      .set("Authorization", 'Bearer ' + createToken(userId))
      .send(coords)
      .expect(200)
      .expect(res =>
           {
            res.body.toHaveProperty("moves", kingMoves)
          }
        );

    })
    it("Should not return anything if it's not the players turn. (409)", async () => {
      const userId = 2;
      const coords = [0, 0]
      await api.get('/api/v1/games/2/legalMoves')
      .set("Authorization", 'Bearer ' + createToken(userId))
      .send(coords)
      .expect(409)
    })
    it("Should not return a pieces moves if the player is not part of the game (403)", async () => {
      const userId = 3;
      const coords = [0, 0]
      await api.get('/api/v1/games/2/legalMoves')
      .set("Authorization", 'Bearer ' + createToken(userId))
      .send(coords)
      .expect(403)
    })
  })
  describe("Play a turn", () => {
    it("Should return a new map if the move is legal. (200)", async () => {
      const userId = 2
      const startCoords = [0, 0];
      const endCoords = [1, 0];
      const requestBody = {
        "startCoords": startCoords,
        "endCoords": endCoords
      }

      const endMap = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['k', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', 'B', ' ', ' ', ' ', ' ', ' '],
        ['n', ' ', ' ', ' ', ' ', ' ', ' ', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K']
      ];

      await api.post('/api/v1/games/1/playTurn')
        .send(requestBody)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(200)
        .expect(res => {
          res.body.state.toHaveProperty('board', endMap)
        })

    })
    it("Should return a victory message if the move is a winning move. (200)", async () => {
      const userId = 1
      const startCoords = [0, 3];
      const endCoords = [4, 7];
      const requestBody = {
        "startCoords": startCoords,
        "endCoords": endCoords
      }

      const endMap = [
        ['r', 'n', 'b', ' ', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', ' ', 'p', 'p', 'p'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', 'p', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', 'P', 'q'],
        [' ', ' ', ' ', ' ', ' ', 'P', ' ', ' '],
        ['P', 'P', 'P', 'P', 'P', ' ', ' ', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
      ];

      await api.post('/api/v1/games/2/playTurn')
        .send(requestBody)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(200)
        .expect(res => {
          res.body.message.toBe("Congratulations, you have won!");
          res.body.state.toHaveProperty('board', endMap);
        })
    })
    it("Should not return anything if the players' move is illegal. (409)", async () => {
      const userId = 2
      const startCoords = [0, 0];
      const endCoords = [1, 1];
      const requestBody = {
        "startCoords" : startCoords,
        "endCoords": endCoords
      }
      await api.post('/api/v1/games/1/playTurn')
        .send(requestBody)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(409)
        .expect(res => {
          res.body.message.toBe("The move you tried is illegal, please try again.")
        })
    })
    it("Should not return anything if the it's not the players turn. (409)", async () => {
      const userId = 1
      const startCoords = [0, 0];
      const endCoords = [1, 1];
      const requestBody = {
        "startCoords" : startCoords,
        "endCoords": endCoords
      }
      await api.post('/api/v1/games/1/playTurn')
        .send(requestBody)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(409)
        .expect(res => {
          res.body.message.toBe("It's not your turn yet.")
        })
    })
    it("Should not play a move if the player is not part of the game. (403)", async () => {
      const userId = 3;
      const startCoords = [0, 0];
      const endCoords = [1, 1];
      const requestBody = {
        "startCoords" : startCoords,
        "endCoords": endCoords
      }
      await api.post('/api/v1/games/1/playTurn')
        .send(requestBody)
        .set("Authorization", 'Bearer ' + createToken(userId))
        .expect(403)
        .expect(res => {
          res.body.message.toBe("It's not your turn yet.")
        })
    })
  })
})

afterEach(async () => {
  await pool.query('DELETE FROM players;');
  await pool.query('DELETE FROM games;');
  await pool.query('DELETE FROM users;');
});