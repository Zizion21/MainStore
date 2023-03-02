const homeController = require("../../http/controllers/api/home.controller");

const router= require("express").Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index Page Document
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Main routes
 *      tags: [IndexPage]
 *      description: This is the first page.
 *      responses:
 *          200:
 *              description: success
 */
router.get("/", homeController.indexPage);

module.exports={
    HomeRoutes: router
}