const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('It works!');
});

router.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

module.exports = router;

