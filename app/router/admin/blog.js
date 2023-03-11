const { AdminBlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router= require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: Getting list of blogs
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/", AdminBlogController.getListOfBlogs);
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: Creating blogs
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   name: title
 *                  type: string
 *                  in: formData
 *                  required: true
 *              -   name: text
 *                  type: string
 *                  in: formData
 *              -   name: short_text
 *                  type: string
 *                  in: formData
 *              -   in: formData
 *                  name: tags
 *                  example: #tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   name: category
 *                  type: string
 *                  in: formData
 *              -   name: image
 *                  type: file
 *                  in: formData
 *          responses:
 *              201:
 *                  description: Created
 */
router.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog)
module.exports={
    BlogAdminApiRoutes: router
}