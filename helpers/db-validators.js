const Role = require('../models/role');
const User = require('../models/users');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    const emailExiste = await User.findOne({correo});
    if(emailExiste){
        throw new Error(`El correo: ${correo}, ya está registrado`)
    }
}

const existeId = async(id) => {
    const existeUserId = await User.findById(id);
    if(!existeUserId){
        throw new Error(`El id no existe: ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeId
}