import { response } from 'express';

import { Usuario } from '../models/usuario.js';

import bcryptcj from 'bcryptjs';
// import { validarCampos } from '../middlewares/validar-campos.js';


const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all( [ 
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
     ] )

    res.json({ total, usuarios });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptcj.genSaltSync();
        resto.password = bcryptcj.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
};

const usuariosPost = async (req, res = response) => {

    // const { google, ...resto } = req.body;              // Extraigo un campo y el resto lo guardo en otro campo
    const { nombre, correo, password, rol } = req.body
     const usuario = new Usuario( { nombre, correo, password, rol} );

    // Encriptar la contraseña
    const salt = bcryptcj.genSaltSync();
    usuario.password = bcryptcj.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.status(201).json(usuario);
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrado fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    // desactivación del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false } );

    res.json({
        id,
        usuario
    });
};

const usuariosPatch =  (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};

export{
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}