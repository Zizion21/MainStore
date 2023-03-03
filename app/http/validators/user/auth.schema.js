const Joi= require("@hapi/joi");
const getOtpSchema= Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(new Error("Phone number is not correct."))
})
const checkOtpSchema= Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).required().error(new Error("Phone number is not correct.")),
    code: Joi.string().min(4).max(6).error(new Error("Code length is not valid."))
})

module.exports={
    getOtpSchema,
    checkOtpSchema
}