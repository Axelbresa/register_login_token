import { body } from 'express-validator'

 const createUserSchema = [
  body('username')
    .exists()
    .notEmpty().withMessage('El username no debe estar vacío.')
    .isString().withMessage('El username debe ser un string.'),
    body('age')
    .exists()
    .notEmpty().withMessage('no debe estar vacío.')
    .isInt().withMessage('La edad debe ser un número entero.'), 
]

export default createUserSchema;