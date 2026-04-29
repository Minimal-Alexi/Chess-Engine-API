import PG from "pg";
import { createTestDb } from "../createTestDb";
import { registerUser,loginUser } from "../../src/controllers/user.controller";


let pool: PG.Pool;

beforeEach(async () => {
  const { pool: testPool } = createTestDb();
  pool = testPool;
  
});

describe('User Controller', () => {
  describe('Authentication handling', () => {
    it('Should register a new user', async () => {


    });
  });
});

afterEach(async () => {
  await pool.end();
});