const { CategoryController } = require("../../http/controllers/admin/category.controller");

const router= require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: Getting list of categories without populate
 *          responses:
 *              200:
 *                  description: Success
 */
router.get("/list-of-all", CategoryController.getCategoriesWithoutPopulate)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
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
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: Updating title of category by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *          responses:
 *              200:
 *                  description: Success
 *              500:
 *                  description: Internal Server Error
 */
router.patch("/update/:id", CategoryController.editCategoryTitle)
module.exports={
    CategoryRoutes: router
}