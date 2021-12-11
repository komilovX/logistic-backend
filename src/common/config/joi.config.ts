import * as Joi from 'joi'

export const joiValidationSchema = () => {
  return Joi.object({
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.required(),
    DATABASE_PASSWORD: Joi.required(),
  })
}
