const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");

const router= require("express").Router();
/**
 * @swagger
 * tags:
 *  -   name: Admin-Panel
 *      description: Admin access only
 *  -   name: Category(AdminPanel)
 *      description: Routes of categories
 *  -   name: Blog(AdminPanel)
 *      description: Routes of blogs
 */
router.use("/category", CategoryRoutes)
router.use("/blogs", BlogAdminApiRoutes)

module.exports={
    AdminRoutes: router
}