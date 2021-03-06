
module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll()
            ]);

            if (car.owner != req.session.user.id) {
                console.log('User is not owner');
                return res.redirect('/login');
            }

            const exixting = car.accessories.map(a=>a.id.toString());
            const aveilableAccessories = accessories.filter(a=> exixting.includes(a.id.toString()) == false)


            res.render('attach', { title: 'Attach Accessory', car, accessories: aveilableAccessories });

        } catch (error) {
            console.log(error.message);
            res.redirect('404')
        }
    },
    async post(req, res) {
        const carId = req.params.id
        const accessoryId = await req.body.accessory;

        

        try {
            if (await req.storage.attachAccessories(carId, accessoryId, req.session.user.id)) {
                res.redirect('/');
            }else{
                res.redirect('/login')
            }
            
        } catch (error) {
            console.log('Error creating accessory')
            console.log(error.message);
            res.redirect(`/attach/${carId}`);
        }
    }
}