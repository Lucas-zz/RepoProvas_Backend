import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export const signInSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
});
