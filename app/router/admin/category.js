const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router= require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: Adding categories
 *          parameters:
 *              -   name: title
 *                  type: string
 *                  required: true
 *                  in: formData
 *              -   name: parent
 *                  type: string
 *                  required: false
 *                  in: formData
 *          responses:
 *              201:
 *                  description: Created
 */
router.post("/add", CategoryController.addCategory);
module.exports={
    CategoryRoutes: router
}