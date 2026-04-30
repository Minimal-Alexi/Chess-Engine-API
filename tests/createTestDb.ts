import { newDb } from 'pg-mem';

export function createTestDb() {
  const db = newDb();

  db.public.none(`
-- USERS TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

-- GAME TABLE
CREATE TABLE game (
    game_id SERIAL PRIMARY KEY,
    turn_counter INTEGER NOT NULL DEFAULT 0,
    team_turn VARCHAR(20) NOT NULL
);

-- PLAYER (JOIN TABLE: users <-> game)
CREATE TABLE player (
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    team VARCHAR(20) NOT NULL,

    PRIMARY KEY (user_id, game_id),

    CONSTRAINT fk_player_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_player_game
        FOREIGN KEY (game_id)
        REFERENCES game(game_id)
        ON DELETE CASCADE
);
  `);

  // Create pg-compatible client
  const pg = db.adapters.createPg();

  return {
    db,
    pool: new pg.Pool(),
  };
}