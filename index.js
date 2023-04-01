const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const path = require('path');
const { title } = require('process');
const albumRoutes = require('./routes/album.routes');

const app = express();
const port = 3000;


mongoose.connect('mongodb://127.0.0.1/phototheque');


app.use(express.json());
app.use(express.urlencoded( { extended: false}));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.set('trust proxy', 1);
app.use(session({
    secret: 'h8SzqfxSIRtuqaR8EGd0YIMMgZPjTh5e',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req, res) => {
    res.redirect('/albums');
});

app.use('/', albumRoutes);

app.use((req, res) => {
    res.status(404);
    res.send('Page non trouvée');
});


app.listen(port, () => {
    console.log('Application lancée sur le port 3000');
});