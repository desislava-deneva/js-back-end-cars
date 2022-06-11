module.exports = {
    get(req, res) {
        res.render('register', { title: 'Register' });
    },
    async post(req, res) {
        if (req.body.username == '' || req.body.password == '') {
            console.log('yes');
            return res.redirect('/register')
        }

        if (req.body.password != req.body.repeatPassword) {
            return res.redirect('/register')
        }

        try {
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (error) {
            console.log(error.message);
            res.redirect('/register')
        }

    }
}