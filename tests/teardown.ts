export default async function teardown() {
    // Perform any necessary cleanup after all tests have run
    console.log('Teardown: Cleaning up after tests...');
    const pool = require('../src/config/database').pool;
    await pool.end();
    console.log('Teardown complete.');
}
