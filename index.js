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
//--[x] accessory read
//--[x] accessory create
//--[x] attach accessory
//--[x] register service
//--[x] login service
//--[x] logout service
//--[x] add authorization chek to data modification


// implement controllers
//--[x] home (catalog)
//--[x] about 
//--[x] details 
//--[x] create 
//--[x] improved home search
//--[x] edit 
//--[x] delete 
//--[x] create accsssory
//--[x] attach accsesoty to car
//--[x] upgrade details to include accessory
//--[x] add session middlewere and auth libraries
//--[x] controller with login register logout actions
//--[x] protect routes  

//[x] add frond-end code 
//[x] add database connection
//[x] create Car model
//[x] upgrade car servise to use Car model
//[x] add validation rules to Car model
//[x] create Accsessory models
//[x] create User model
//[x] add owner property to Car , Acessory models

const express = require('express')
const hbs = require(`express-handlebars`);
const session = require('express-session')

const initDb = require('./models/index');

const carService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/authService')

const { home } = require('./controlers/home');
const { about } = require('./controlers/about');
const create = require('./controlers/create');
const { details } = require('./controlers/details');
const editCar = require('./controlers/edit');
const deleteCar = require('./controlers/delete');
const accsessory = require('./controlers/accessory');
const attach = require('./controlers/attach');
const login = require('./controlers/login');
const register = require('./controlers/register');
const logout = require('./controlers/logout')

const { notFound } = require('./controlers/404');
const { isLoggedIn } = require('./services/util');

start();

async function start() {
    await initDb()

    const app = express();

    app.engine('hbs', hbs.create({
        extname: '.hbs'
    }).engine);

    app.set('view engine', '.hbs');
    app.use(session({
        secret: 'my super duper secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carService());
    app.use(accessoryService());
    app.use(authService())

    app.get('/', home)
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/login')
        .get(login.get)
        .post(login.post)

    app.route('/register')
        .get(register.get)
        .post(register.post)


    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post)

    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post)

    app.route('/edit/:id')
        .get(isLoggedIn(), editCar.get)
        .post(isLoggedIn(), editCar.post)

    app.route('/accessory')
        .get(isLoggedIn(), accsessory.get)
        .post(isLoggedIn(), accsessory.post);

    app.route('/attach/:id')
        .get(isLoggedIn(), attach.get)
        .post(isLoggedIn(), attach.post);

    app.get('/logout', logout.get)

    // app.get('/create', create.get);
    // app.get('/create', create.post);


    app.all('*', notFound)

    app.listen(3000, () => console.log('Server strt post 3000'))
}
