const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/middlewares/auth');


router.get('/', authMiddleware.hasAuth, (req, res) => {
    console.log(req.session)
    return res.render('index/views/index')
});

router.route('/login')
    .get(authMiddleware.noAuthed, (req, res) => {
        return res.render('index/views/login')
    })
    .post(authMiddleware.noAuthed, (req, res) => {
        const { username, password } = req.body
        
        if (username === 'admin' && password === 'pass') {
            req.session.user = {
                user: 'admin'
            }

            return res.redirect('/')
        }
    })

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

exports.index = router;