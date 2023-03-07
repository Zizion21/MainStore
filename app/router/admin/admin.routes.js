const { CategoryRoutes } = require("./category");

const router= require("express").Router();
/**
 * @swagger
 * tags:
 *  name: Admin-Panel
 *  description: Admin Access
 */
router.use("/category", CategoryRoutes)

module.exports={
    AdminRoutes: router
}