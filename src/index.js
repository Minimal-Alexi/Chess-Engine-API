const express = require('express');
const app = express();
const port = 8080;
// Start the server
// Respond to GET request on the root route
app.get('/', (req, res) => {
  res.send('GET request to the homepage');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 