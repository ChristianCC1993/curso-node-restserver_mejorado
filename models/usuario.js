

import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({

        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        correo: {
            type: String,
            required: [true, 'El correo es obnligatorio'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obnligatorio']
        },
        img: {
            type: String
        },
        rol: {
            type: String,
            required: true,
            emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

export const Usuario = model('Usuario', UsuarioSchema);