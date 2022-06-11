module.exports = {


    get(req, res) {

        req.auth.logout();
        res.redirect('/')

    }
}