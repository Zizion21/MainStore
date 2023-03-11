const Joi= require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const addCategorySchema= Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("Add a valid title.")),
    parent: Joi.string().allow('').pattern(MongoIDPattern).error(new Error("Parent ID is not valid❗"))
})
const updateCategorySchema= Joi.object({
    title: Joi.string().min(3).max(30).error( new Error("Add a valid title for category❗"))
})

module.exports={
    addCategorySchema,
    updateCategorySchema
}