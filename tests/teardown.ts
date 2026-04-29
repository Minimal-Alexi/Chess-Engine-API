export default async function teardown() {
    // Perform any necessary cleanup after all tests have run
    console.log('Teardown: Cleaning up after tests...');
    // Example: Close database connections, clear test data, etc.
    // await closeDatabaseConnection();
    console.log('Teardown complete.');
}
