//Invocamos a express
const express = require('express');
const app = express();

//Plantilla ejs
app.set('view engine', 'ejs');

// seteamos urlencoded para capturar los datos del formulario 
app.use(express.urlencoded({extended:false}));
app.use(express(JSON));


app.use('/', require('./router'));

app.listen(1000, ()=>{
    console.log('SERVER corriendo en http://localhost:1000');
});