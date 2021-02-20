const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('hellow express');
})

router.delete('/', (req, res) => {
  res.send('hellow express');
})
module.exports = router