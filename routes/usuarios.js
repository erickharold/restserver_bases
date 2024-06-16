const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, usuarioExistePorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        //check('rol').custom( (rol) => esRoleValido(rol)),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPost);

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExistePorId),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(usuarioExistePorId),
        validarCampos
], usuariosDelete);

module.exports = router;