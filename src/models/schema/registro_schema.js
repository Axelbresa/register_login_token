import { body } from 'express-validator'

 const createCorreoSchema = [
  body('username')
    .exists()
    .notEmpty().withMessage('El username no debe estar vacío.')
    .isString().withMessage('El username debe ser un string.'),
  body('password')
    .exists()
    .notEmpty()
    .isString(),
  body('correo')
    .exists().withMessage("debe existir el correo")
    .notEmpty().withMessage("no puede estar vacio")
    .isEmail().withMessage("debe ser un email valido"),
]

export default createCorreoSchema;