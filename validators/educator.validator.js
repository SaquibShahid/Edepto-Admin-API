const Joi = require('joi').extend(require('@joi/date'));

exports.create = Joi.object({
    username: Joi.string().required().min(3).max(30).trim().messages({
        "string.base": `username should be a type of 'text'`,
        "string.empty": `username cannot be an empty field`,
        "string.min": `username should have a minimum length of {#limit}`,
        "string.max": `username should have a maximum length of {#limit}`,
        "any.required": `username is a required field`
    }),
    mobileNumber: Joi.string().required().min(10).max(10).pattern(new RegExp('^[6-9][0-9]{9}$')).messages({
        'string.base': `Mobile Number should be a type of 'text'`,
        'string.empty': `Mobile Number cannot be an empty field`,
        'string.min': `Mobile Number should have a minimum length of {#limit}`,
        'string.max': `Mobile Number should have a maximum length of {#limit}`,
        'string.pattern.base': `Mobile Number should be a valid Indian Mobile Number`,
        'any.required': `Mobile Number is a required field`
    }),
    emailId: Joi.string().email().messages({
        'string.base': `Email Id should be a type of 'text'`,
        'string.empty': `Email Id cannot be an empty field`,
        'string.email': `Email Id should be a valid email`
    }),
    qualification: Joi.string().required().messages({
        'string.base': `Qualification should be a type of 'text'`,
        'string.empty': `Qualification cannot be an empty field`,
        'any.required': `Qualification is a required field`
    }),
    age: Joi.number().integer().required().messages({
        'number.base': `Age should be a type of 'number'`,
        'number.empty': `Age cannot be an empty field`,
        'number.integer': `Age should be an integer`,
        'any.required': `Age is a required field`
    }),
    language: Joi.string().required().messages({
        'string.base': `Language should be a type of 'text'`,
        'string.empty': `Language cannot be an empty field`,
        'any.required': `Language is a required field`
    }),
    exampleTest: Joi.string().uri().required().messages({
        'string.base': `Link should be a type of 'text'`,
        'string.empty': `Link cannot be an empty field`,
        'string.uri': `Link should be a valid url`,
        'any.required': `Link is a required field`
    }),
});

