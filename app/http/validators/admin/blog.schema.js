const Joi= require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const createError= require("http-errors");

const createBlogSchema= Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("Enter a valid title(between 3-30 character)")),
    text: Joi.string().error(createError.BadRequest("Enter a valid text.")),
    short_text: Joi.string().error(createError.BadRequest("Enter a valid text.")),
    image: Joi.string().error(createError.BadRequest("Upload a picture.")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Only 20 tags at the top is allowed❗")),
    category: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest("Category not found⚠️"))
});

module.exports={
    createBlogSchema
}