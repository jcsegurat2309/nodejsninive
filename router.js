const express = require('express');
const router = express.Router();
const app = express()
const bcrypt = require("bcrypt") // Importando bcrypt package
const session = require('express-session');

const user = []

app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: 'secreto', // Deberías cambiar esto por una clave secreta más segura
    resave: false,
    saveUninitialized: true
}));

// Configurando la funcionalidad de publicación de registro
/*app.post("/register", function (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.push({
            id: Date .now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log(user); // Muestra en consola el registro
        res.redirect("/login")
        
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})*/
/*
router.post("/register", async (req, res) =>{
    try{
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body['password'], 10);
        user.push({
            id: Date.now().toString(), 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.send(user);
    }catch(e){
        res.send(`Hubo un error ${e}`);
    }
});
*/

const conexion = require('./database/db');

router.get('/', (req, res)=>{
    res.render('index');
         
      })
 

router.get('/login', (req, res)=>{
    res.render('login');
})


router.get('/register', (req, res)=>{
    res.render('register');
})

router.get('/tables', (req, res)=>{
    
         
     conexion.query('SELECT * FROM users', (error, results)=>{
         if(error){
             throw error;
         }else{
             res.render('tables', {results:results});
         }
     })
 })

 /*
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
});
*/
app.get('/logout', (req, res) => {
    // Verificar si existe una sesión antes de destruirla
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.status(500).send('Error al cerrar sesión');
            } else {
                res.redirect('/login');
            }
        });
    } else {
        // Si no hay sesión, redirigir al usuario al inicio de sesión
        res.redirect('/login');
    }
});


app.get('/login', (req, res) => {
    res.send('/login')
    
});


//RUTA PARA CREAR REGISTRO LOGIN
router.get('/register', (req, res)=>{
    res.render('register');
})


//RUTA PARA CREAR REGISTROS
router.get('/create', (req, res)=>{
    res.render('create');
})


//RUTA PARA EDITAR REGISTROS
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        } else{
            res.render('edit', {user:results[0]});
        }

    })
})

//RUTA PARA ELIMINAR EL REGISTRO
router.get('/delete/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?', [id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/');;
        }
    })
});

const crud = require('./controllers/crud');

router.post('/register', crud.register);
router.post('/login', crud.login);
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;