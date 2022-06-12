module.exports = {
    async get(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);

        if (car.owner != req.session.user.id) {
            console.log('User is not owner');
            return res.redirect('/login');
        }

        if (car) {
            res.render('delete', { title: `Delete listing - ${car.name}`, car });
        } else {
            res.redirect('404')
        }
    },
    async post(req, res) {
        const id = req.params.id;

        try {
            if (await req.storage.deleteById(id, req.session.user.id)) {
                res.redirect('/');
            }else{
                res.redirect('/login')
            }

        } catch (error) {
            console.log('Attemped to delete non-existed Id :', id);
            console.log(error.message);
            res.redirect('/404')

        }
    }
};