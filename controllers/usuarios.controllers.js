import { response } from 'express';

const usuariosGet = (req, res = response) => {

    const query = req.query;
    const { q, nombre = 'No name', apikey,page = '1', limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q, nombre, apikey, page, limit
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;
    res.json({
        msg: 'put API - controlador',
        id
    });
};

const usuariosPost = (req, res = response) => {

    const body = req.body;              // Esto captura todo lo que venga en el json
    const { nombre, edad }= req.body;   // De esta forma se filtra y se extrae solo los campos nombre y edad

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
};

const usuariosDelete =  (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
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