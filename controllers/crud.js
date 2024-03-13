const conexion = require("../database/db");

exports.register = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  conexion.query(
    "INSERT INTO user SET ?",
    { name: name, email: email, password: password },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/login");
      }
    }
  );
};
/*exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    conexion.query('SELECT * FROM user WHERE email = ? AND password = ?', {email, password}, (err, result) => {
        
        if (email === email && password===password) 
        {
            // Iniciar sesión y redirigir a la página de inicio
            req.session.user = user.id;
            res.redirect('/tables');
        } else {
            // Credenciales inválidas, mostrar mensaje de error
            res.send('Credenciales inválidas. <a href="/login">Intentar de nuevo</a>');
        }
    });
};
*/

const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Validar que el correo electrónico y la contraseña no estén vacíos
  if (!email || !password) {
    res.status(400).send("Debes proporcionar un correo electrónico y una contraseña.");
    return;
  }

  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).send("El formato del correo electrónico no es válido.");
    return;
  }

  // Consulta SQL corregida para evitar inyección de SQL
  conexion.query(
    "SELECT id, email, password FROM user WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
        return;
      }

      if (results.length > 0) {
        const user = results[0];
        const { email: correo, password: contra } = results[0];
        if (correo == email && contra == password) {
          return res.status(200).send("Credenciales correctas");
        } else {
          return res.status(500).send("Credenciales incorrectas");
        }
        // Comparar la contraseña utilizando bcrypt
        // bcrypt.compareSync(password, user.password, (bcryptErr, bcryptResult) => {
        //   if (bcryptErr) {
        //     console.error(bcryptErr);
        //     res.status(500).send("Error interno del servidor");
        //     return;
        //   }

        //   if (bcryptResult) {
        //     // Contraseña correcta, iniciar sesión y redirigir a la página de inicio
        //     req.session.user = user.id;
        //     res.redirect("/tables");
        //   } else {
        //     // Credenciales inválidas, mostrar mensaje de error
        //     res.status(401).send('Credenciales inválidas. <a href="/login">Intentar de nuevo</a>');
        //   }
        // });
      } else {
        // No se encontró ningún usuario con ese correo electrónico
        res.status(404).send('Usuario no encontrado. <a href="/login">Intentar de nuevo</a>');
      }
    }
  );
};

exports.save = (req, res) => {
  const user = req.body.user;
  const rol = req.body.rol;
  conexion.query("INSERT INTO users SET ?", { user: user, rol: rol }, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
};

exports.update = (req, res) => {
  const id = req.body.id;
  const user = req.body.user;
  const rol = req.body.rol;
  conexion.query(
    "UPDATE users SET ? WHERE id = ?",
    [{ user: user, rol: rol }, id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    }
  );
};
