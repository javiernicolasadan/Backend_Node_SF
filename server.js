const express = require('express'); 
const app = express(); 
const generateToken = require('./jwt/tokenService');

// Load environment variables from .env file
process.loadEnvFile() 
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!'); 
});

app.get('/token', async (req, res) => {
  try {
    const token = await generateToken.generateToken();
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating token');
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
