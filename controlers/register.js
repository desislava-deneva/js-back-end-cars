const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const router = Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});


router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 charecters log')
        .isAlphanumeric().withMessage('Username may be contains only digits and letters'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 charecters log')
        .isAlphanumeric().withMessage('Password may be contains only digits and letters'),
    body('repeatPassword')
        .custom((value, { req }) => { return value == req.body.password })
        .withMessage('Password don\'t mach'),

    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw errors
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/')
        } catch (err) {
            console.log(err.message);
            res.locals.errors = err;
            res.render('register', { title: 'Register', data: { username: req.body.username } });
        }

    });


module.exports = router;
