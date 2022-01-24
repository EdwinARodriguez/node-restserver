const {response} = require('express');
const User = require('../models/users');
const bcryptjs = require('bcryptjs');

const usersGet = async (req, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    
    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //Guardar en bd
    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {
    
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} =  req.body;

    // Validar con bd
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id,resto);
    
    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usersDelete = async (req, res = response) => {
    
    const {id} = req.params;

    // Fisicamente
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {estado: false});
    
    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}