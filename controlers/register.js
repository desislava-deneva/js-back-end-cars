const { validationResult } = require("express-validator");

module.exports = {
    get(req, res) {
        res.render('register', { title: 'Register' });
    },
    async post(req, res) {

        const { errors } = validationResult(req);

        try {

            if (errors.length > 0) {
                throw errors;
            }
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (errors) {
            console.error(errors);
            res.render('register', { title: 'Register', errors, data: { username: req.body.username } })
        }

    }
}