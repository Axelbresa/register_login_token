import { body } from 'express-validator'

 const createLoginSchema = [
  body('password')
    .exists()
    .notEmpty()
    .isString(),
  body('correo')
    .exists().withMessage("debe existir el correo")
    .notEmpty().withMessage("no puede estar vacio")
    .isEmail().withMessage("debe ser un email valido"),
]

export default createLoginSchema;