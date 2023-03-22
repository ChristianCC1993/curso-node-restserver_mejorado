import { role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';

const esRoleValido = async(rol ='') => {
    const existeRol = await role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });          // Buscan en la Bd si existe el correo, de existir toma el objeto que contiene ese email
    if (existeEmail) {                                              // si el objeto existeEmail contiene algo entones ejecuta lo siguiente
        throw new Error(`correo: ${ correo } ya está registrado`)
    }
}

const usuarioExiste = async( id ) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Usuario con id : ${ id } no existe`)
    }
}

export {esRoleValido, emailExiste, usuarioExiste }