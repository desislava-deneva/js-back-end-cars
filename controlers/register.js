const { Router } = require('express');

const router = Router();

router.get('/register', (req, res) =>  {
    res.render('register', { title: 'Register' });
});

router.post('/register', async (req, res) =>{
    if (req.body.username == '' || req.body.password == '') {
        return res.redirect('/register')
    }

    if (req.body.password != req.body.repeatPassword) {
        return res.redirect('/register')
    }

    try {
        await req.auth.register(req.body.username, req.body.password);
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
        res.redirect('/register')
    }

});


module.exports = router;
