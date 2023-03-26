const express = require('express');

if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}

/******************************MIDDLEWARE******************************** */

const app = express();
const port = process.env.PORT || 1000;

app.use(express.static(__dirname + '/'));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('X-Forwarded-Proto', 'http')
    if (req.method === 'OPTIONS') {
    	res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, PATCH');
    	return res.status(200).json({});
    }
    next();
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Esto desactiva esta opción y permite enviar info mediante formularios

//Routes 
app.use(require('./routes/inventory'));

//Starting server
app.listen(port, function() {
  console.log('Servidor web escuchando en el puerto', port);
});

/******************************MIDDLEWARE******************************** */
