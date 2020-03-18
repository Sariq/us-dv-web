const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/converters', require('./converters'));
router.use('/payments', require('./payments'));

module.exports = router;