const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('hello', req.session);
});

exports.index = router;