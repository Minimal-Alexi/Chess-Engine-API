import PG from "pg";
import { createTestDb } from "../createTestDb";

let pool: PG.Pool;

beforeAll(async () => {
  const { pool: testPool } = createTestDb();
  pool = testPool;
});

describe('User Controller', () => {
  console.log("Test has ran");
  test('should create a new user', async () => {
    // Example test case for creating a new user
    expect(true).toBe(true); // Placeholder assertion
    
    // Simulate a request to the user creation endpoint
    // const response = await request(app)
    //   .post('/api/v1/users')
    //   .send(newUser);

    // Expect the response to be successful and contain the new user data
    // expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty('user_id');
    // expect(response.body.username).toBe(newUser.username);
    // expect(response.body.email).toBe(newUser.email);

  });
});

afterAll(async () => {
  await pool.end();
});