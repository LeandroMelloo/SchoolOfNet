const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');

const app = express();

// setando configurações básicas do servidor.
app.set('PORT', process.env.PORT || 9000);
app.set('HOST', process.env.HOST || 'localhost');
app.set('NODE_ENV', process.env.NODE_ENV || 'development'); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // setando o caminho no diretorio 'views' dentro de src.

app.use(express.static(path.join(__dirname, './public'))); // setando configurações para os arquivos estáticos.
app.use(expressPinoLogger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(expressEjsLayouts);
app.use(connectFlash());
app.use(expressSession({
    secret: '1tech#1000',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./src/index')(app); // requerimento das rotas.

app.listen(app.get('PORT'), app.get('HOST'), () => console.log(`Servidor rodando http://${app.get('HOST')}:${app.get('PORT')} ENV ${app.get('NODE_ENV')}`));