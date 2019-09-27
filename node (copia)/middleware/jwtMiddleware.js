const jwtHelper = require('../helpers/jwtHelper');
/**nos da paso a las rutas url o no ,
 * sirve para proteger las rutas, que cogera el token antes
 * de entrar a la ruta y vera la compatibilidad si el usuario puede
 * acceder o no
*/

function protegerRutas(req, res, next){
    /* const acceso = false;

    if(acceso){
        next();
    } else {
        res.status(400).json({message: 'acceso restringido'});
    } */

    if(!req.headers.authorization){
        res.status(400).json({message: 'acceso restringido'});
    }else{
        let token = req.headers.authorization;
        console.log('token decode', jwtHelper.decode(token));

        next();
    }
}

//lo ponemos entre corchetes por si ponemos mas de una ruta a proteger en userRoutes
module.exports = {protegerRutas};