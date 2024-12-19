const express = require('express');
const router = express.Router();
const generateToken = require('../../jwt/tokenService');

router.get('/', async (req, res) => {
  try {
    const token = await generateToken.generateToken();
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating token');
  }
});



module.exports = router;