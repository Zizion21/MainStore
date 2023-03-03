const homeController = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

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
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer TOKEN...
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 */
router.get("/", verifyAccessToken, homeController.indexPage);

module.exports={
    HomeRoutes: router
}