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
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Getting parent categories
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Getting child categories by Parent ID
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/children/:parent", CategoryController.getChildrenOfParent);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Getting all the categories
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/all", CategoryController.getAllCategories);
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: Deleting categories by ID
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *          responses:
 *              200:
 *                  description: Success
 */
router.delete("/remove/:id", CategoryController.removeCategory);
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Getting category by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/:id", CategoryController.getCategoryById);
module.exports={
    CategoryRoutes: router
}