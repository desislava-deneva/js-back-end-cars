// [x] initialize an configure Express app
// [x] initialize templating lib 
// [x] create home controler
// [x] bind routing 
// [x] create layout
//  create data service
//--[x] read all
//--[x] read one by id
//--[x] create
//--[] edit
//--[x] delete
//--[x] search

// implement controllers
//--[x] home (catalog)
//--[x] about 
//--[x] details 
//--[x] create 
//--[x] improved home search
//--[] edit 
//--[x] delete 

// [x] add frond-end code 

const express = require('express')
const hbs = require(`express-handlebars`);
const carService = require('./services/cars')

const { notFound } = require('./controlers/404');
const { about } = require('./controlers/about');
const create = require('./controlers/create');
const { details } = require('./controlers/details');
const { home } = require('./controlers/home');
const deleteCar = require('./controlers/delete');

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

// app.get('/create', create.get);
// app.get('/create', create.post);


app.all('*', notFound)

app.listen(3000, () => console.log('Server strt post 3000'))