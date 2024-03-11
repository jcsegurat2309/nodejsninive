//Invocamos a express
const express = require('express');
const app = express();
const port = 1000;
//Plantilla ejs
app.set('view engine', 'ejs');

// seteamos urlencoded para capturar los datos del formulario 
app.use(express.urlencoded({extended:false}));
app.use(express(JSON));


app.use('/', require('./router'));

app.listen(port, ()=>{
    console.log('SERVER corriendo en ${port}');
});