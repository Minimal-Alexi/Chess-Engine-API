-- USERS TABLE
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL
);

-- GAME TABLE
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    turn_counter INTEGER NOT NULL DEFAULT 0,
    game_state VARCHAR(128) NOT NULL DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
);

-- PLAYER (JOIN TABLE: users <-> game)
CREATE TABLE players (
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    team VARCHAR(8) NOT NULL,

    PRIMARY KEY (user_id, game_id),

    CONSTRAINT fk_player_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_player_game
        FOREIGN KEY (game_id)
        REFERENCES games(game_id)
        ON DELETE CASCADE
);