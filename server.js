const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const { dbConnection } = require('./config/DatabaseConnection');

dotenv.config();


const app = express()

app.use( cors() );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();

app.use( express.static( path.resolve( __dirname, './public' ) ) );

app.use( "/api/user", require('./routes/UserRoutes') );
app.use( '/api/fruit', require('./routes/FruitRoutes') );
//app.use( '/api/city', require('../routes/CityRoutes') );

app.get('*', (req, res) => {
  res.sendFile( path.resolve( __dirname, './public/index.html' ) );
});


module.exports = app;