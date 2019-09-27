const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values:['Admin','User'],
    message: '{VALUE} rol no permitido' 
}

const userSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el email es necesario']
    },
    password: {
        type: String,
        required: [true, 'Es necesario el password']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'Es rol el password'],
        enum: roles
    }
});

userSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico'});

module.exports = mongoose.model('user', userSchema);