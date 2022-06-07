
module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [car, accessory] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll()
            ]);
            res.render('attach', { title: 'Attach Accessory', car, accessory })
 
        } catch (error) {
            console.log(error.message);
            res.redirect('404')
        }
    },
    async post(req, res) {
        console.log(req.params.id, req.body);
        res.redirect('/')
    }
}