
import { Router } from 'express';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/usuarios.controllers.js';

const router = Router();

router.get('/', usuariosGet ); 

router.put('/:id', usuariosPut );   // para obtener el valor que se pase aqui de manera dinámica se coloca /:id

router.post('/', usuariosPost ); 

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export { router }
