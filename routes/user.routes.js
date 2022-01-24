const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener más de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usersPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeId),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeId),
    validarCampos
], usersDelete);


module.exports = router;