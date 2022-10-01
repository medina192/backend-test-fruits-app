const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');

const { dbConnection } = require('./config/DatabaseConnection');

dotenv.config();

//console.log("")
const app = express()

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// https://stackoverflow.com/questions/36904048/socket-io-express-framework-emit-fire-from-express-controller-router

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use( cors() );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();

app.use( express.static( path.resolve( __dirname, './public' ) ) );

app.use( "/api/user", require('./routes/UserRoutes') );
app.use( '/api/fruit', require('./routes/FruitRoutes') );
app.use( '/api/city', require('./routes/CityRoutes') );
app.use( '/api/stock', require('./routes/StockRoutes') );

app.get('*', (req, res) => {
  res.sendFile( path.resolve( __dirname, './public/index.html' ) );
});

server.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}!`);
});

module.exports = app;