
import { Router } from 'express';
import { check } from 'express-validator';
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut } from '../controllers/usuarios.controllers.js';
import { emailExiste, usuarioExiste, esRoleValido } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/', usuariosGet ); 

router.put('/:id', [  // para obtener el valor que se pase aqui de manera dinámica se coloca /:id
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( usuarioExiste ),
    //check('rol').custom( esRoleValido ), // falta si rol no va a modificar
    validarCampos
] , usuariosPut );  

router.post('/', [  // Se puede colocar un middleware en una consulta como segundo argumento si esta consulta cuenta con 3 argumentos, de poseer solo 2 argumentos el segundo lo toma como el controlador
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['USER_ROLE','ADMIN_ROLE']),
    check('rol').custom( esRoleValido ),        // Se puede colocar como ((rol) => esRoleValido(rol)), pero como el argumento que se recibe y envia es el mismo se puede omitir colocarlo
    validarCampos       // Evita que pase al controlador si es que hay errores para que no reviente la app
] , usuariosPost );    

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

export { router }
