// [x] initialize an configure Express app
// [x] initialize templating lib 
// [x] create home controler
// [x] bind routing 
// [x] create layout

//  create data service
//--[x] read all
//--[x] read one by id
//--[x] create
//--[x] edit
//--[x] delete
//--[x] search
//--[] accessory read
//--[] accessory create
//--[] attach accessory

// implement controllers
//--[x] home (catalog)
//--[x] about 
//--[x] details 
//--[x] create 
//--[x] improved home search
//--[x] edit 
//--[x] delete 
//--[] create accsssory
//--[] attach accsesoty to car
//--[] upgrade details to include accessory
//--[]

// [x] add frond-end code 
//[] add database connection
//[] create car model
//[] upgrade car servise to use Car model
//[] create Accsessory models
//[] 

const express = require('express')
const hbs = require(`express-handlebars`);

const initDb = require('./models/index');

const carService = require('./services/cars')

const { home } = require('./controlers/home');
const { about } = require('./controlers/about');
const create = require('./controlers/create');
const { details } = require('./controlers/details');
const editCar = require('./controlers/edit');
const deleteCar = require('./controlers/delete');

const { notFound } = require('./controlers/404');
start()

async function start() {
    await initDb()

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine)

    app.set('view engine', '.hbs')

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carService())

    app.get('/', home)
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post)

    app.route('/delete/:id')
        .get(deleteCar.get)
        .post(deleteCar.post)

    app.route('/edit/:id')
        .get(editCar.get)
        .post(editCar.post)


    // app.get('/create', create.get);
    // app.get('/create', create.post);


    app.all('*', notFound)

    app.listen(3000, () => console.log('Server strt post 3000'))
}
