const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtToken = require('../helpers/jwtHelper');

function listar(req,res){

    user.find({},function(error, respuestUser){
        if(error){
            return res.status(400).json({'error': error, 'message': 'no se pueden listar usuarios'});
        }
        if(respuestUser){
            return res.status(200).json({'message': 'lista de usuarios', 'usuarios' : respuestUser});
        }
    }); 

}

function crear(req,res){
   // return res.status(200).json({'datos': req.body.user});
    const usuario = req.body.user;
    let newUser = new user (usuario);

    /* let newUser = new user ();

    newUser.nombre = 'JUan1';
    newUser.email = 'correo2@gmail.com';
    newUser.password = '1234';
     */

    bcrypt.hash(usuario.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return res.status(400).json({ 'error': 'no se ha podido encriptar'});
        }
        if(hash){
            newUser.password = hash;

            newUser.save().then(() =>{ 
                console.log('usuario creado');
                res.status(200).json({ 'message': 'usuario creado', newUser});
        
            })
            .catch(error => {
                console.log("error user", error);
                res.status(400).json({'error':error});      
            });
        }
      });

  
            
}

function update(req,res){
    let id = req.query.id;
    const usuario = req.body.user;
    
    const protectedUser = {
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role
    }
   
    /*solo actualizara los nombre que haya en el obejto
    protectedUser, evitando asi que modifique el email */

/*   
    Antigua manera  
    user.findByIdAndUpdate( id, {$set: protectedUser},{new:true},function(error, userupdate){
        if(error){
            return res.status(400).json({error});
        }
        if(userupdate){
            return res.status(200).json({'message': 'usuario actualizado', userupdate});
        }
    });
 */
    //nueva manera
    user.updateOne({_id: id}, {$set: protectedUser},function(error, userupdate){
        if(error){
            return res.status(400).json({error});
        }
        if(userupdate){
            return res.status(200).json({'message': 'usuario actualizado', userupdate});
        }
    });
    
}

// Update user password
function updatePassword(req,res){
    let id = req.query.id;
    const password = req.body.password;
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            return res.status(400).json({ 'error': 'no se ha podido encriptar'});
        }
        if(hash){
            user.updateOne({_id: id}, {$set: {password: hash}},function(error, userupdate){
                if(error){
                    return res.status(400).json({error});
                }
                if(userupdate){
                    return res.status(200).json({'message': 'Password encriptado actualizado', userupdate});
                }
            });
        }
    });
  
 
}

function borrar(req,res){
    let id = req.query.id;

    user.find({_id: id},function(error, respuestUser){

        
        if(error){
            return res.status(400).json({'error': error, 'message': 'no se pueden listar usuarios'});
        }
        if(respuestUser){
            if(respuestUser.length < 1){
                return res.status(400).json({error: 'el id no existe'});
            }
            user.deleteOne({_id: id}, function(error, deleteUser){
                if(error){
                    return res.status(400).json({error});
                }
                if(deleteUser){
                    return res.status(200).json({'message': 'usuario eliminado', deleteUser});
                }
            });
        }
    }); 

  
    
}

function login(req, res){
    let usuario = req.body.user;

    user.findOne({ email: usuario.email }, function(error, resp){
        if(error){
            return res.status(400).json({'error find mail': error});
        }
        if(resp){
          
            bcrypt.compare(usuario.password, resp.password, function(err, respuesta) {
                if(err){
                    return res.status(400).json({'error': error});
                }
                if(respuesta){
                    let token = jwtToken.encode(resp);
                    return res.status(200).json({'message': 'usuario logueado','usuario': resp, token});
                } else {
                    /*Este else sirve para controlar la contraseña cuando no coincidan*/
                    return res.status(400).json({'error': 'email o password no coinciden'});
                }

            });
        } else {
            return res.status(400).json({'error': resp});

        }
    });
}

function getUser(req, res){
    let id = req.query.id;
    //password: 0 nos sirve para que no muestre a contraseña (con 1 lo mostraria)
    //la contraseña va por otra ruta por seguridad
    user.findOne({_id: id},{password: 0},function(error, respuestUser){
        if(error){
            //Este error se activa si la app o la bbdd revienta
            return res.status(400).json({'error': error, 'message': 'no se pueden encontrar al usuario'});
        }
        if(respuestUser){
            return res.status(200).json({'message': 'usuario encontrado', 'usuarios' : respuestUser});
        } else {
            //Nos devuelve error si la lista no contiene usuarios
            return res.status(400).json({'error': 'no se ha encontrado al usuario/no hay usuarios'});
        }
    }); 

}                           

module.exports = {
    listar,
    crear,
    update,
    updatePassword,
    borrar,
    login,
    getUser
};