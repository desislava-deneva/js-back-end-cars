const { Router } = require('express');
const router = Router();
const { body, validationResult } = require('express-validator');


router.get('/login', (req, res) => {

    res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {

    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/')
    } catch (error) {
        console.error(error.message);
        res.redirect('/login')
    }

})

module.exports = router;
