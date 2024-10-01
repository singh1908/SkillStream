const Joi = require("joi");
// joi validate karta hai data types aur required fields ko.
// It allows you to define schemas for your data and validate user input against those schemas.

const student_signupValidation = (req, res, next) => {
    // object ke format me request aane wali hai
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message: "Bad Request", error})
    }
    next();
}
const student_loginValidation = (req, res, next) => {
    // object ke format me request aane wali hai
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({message: "Bad Request", error})
    }
    next();
}


module.exports = {
    student_signupValidation,
    student_loginValidation
}