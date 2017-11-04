const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send('index/dashboard');
});

router.get('/about', (req, res) => {
    res.send('index/about');
});

module.exports = router;

