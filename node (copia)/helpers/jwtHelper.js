const jwt = require('jsonwebtoken');
const clave = "mi clave secreta"

/*Encriptamos el login de inicio de sesion para hacer una sesion temporal,
que caducará en una hora*/ 

exports.encode = function(user){
 let playload = {
     nombre: user.nomre,
     email: user.email,
     role: user.role,
     iat: Date.now(), //fecha en la que se genera el token, se devuelve en mlsegundos
     exp: (Date.now() + (1000*60*60*24))
 }

 var token = jwt.sign(playload, clave);

 return token;
}

//coge la informacion del usuario y la encripta, se la pasamos al frontend,
//y al hacer ciertas peticiones te deja entrar a unas url u otras (es selectivo)
exports.decode = function (token){
    let respuesta =jwt.decode(token,clave);
    return respuesta;
}