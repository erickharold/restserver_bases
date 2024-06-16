const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    // los query son los queryparams que son los parametros de la url
    //const {nombre = 'No name', apikey = 'No apikey'} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true};

    /*const usuarios = await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

    const total = await Usuario.countDocuments({ estado: true });*/

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        msg: 'get API - controlador usuariosGet',
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
    /*const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)
    {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })
    }*/
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    
    // Guardar en la BD
    await usuario.save();

    res.json({
        msg: 'get API - controlador usuariosPost',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // Todo validar contra base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    //const usuario = await Usuario.findOneAndUpdate(id, resto);
    //const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} )

    res.json({
        msg: 'get API - controlador usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'get API - controlador usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'get API - controlador usuariosDelete',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}