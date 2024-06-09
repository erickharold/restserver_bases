const {response} = require('express');

const usuariosGet = (req, res = response) => {

    // los query son los queryparams que son los parametros de la url
    const {q = 'No q', nombre = 'No name', apikey = 'No apikey'} = req.query;

    res.json({
        msg: 'get API - controlador usuariosGet',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'get API - controlador usuariosPost',
        body
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'get API - controlador usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'get API - controlador usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'get API - controlador usuariosDelete'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}