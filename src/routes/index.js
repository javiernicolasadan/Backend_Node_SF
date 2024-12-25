const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Backend service for getting data from commuting running'); 
});

module.exports = router;