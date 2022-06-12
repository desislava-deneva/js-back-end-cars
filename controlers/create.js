const { validationResult } = require("express-validator");


module.exports = {

    async get(req, res) {
        res.render('create', { title: 'Create Listing' });

    },
    async post(req, res) {
        const { errors } = validationResult(req);

        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        }

        if (!car.imageUrl) {
            car.imageUrl = 'noImage.jpg'
        }

        try {

            await req.storage.createCar(car);
            res.redirect('/');
            
        } catch (errors) {
            if (errors.name === 'ValidationError') {
                errors = Object.values(errors.errors).map(e => ({ msg: e.message }))
            }
            console.log('Error creating record');
            res.render('create', { title: 'Create Listing', errors });
        } 

    }
}