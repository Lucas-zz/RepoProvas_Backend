import joi from 'joi';

const authSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})

export default authSchema;